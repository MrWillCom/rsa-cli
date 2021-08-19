const fs = require('fs');
const inquirer = require('inquirer');
const sjcl = require('sjcl');

const _p = require('../functions/path');
const config = require('../functions/config');
const output = require('../functions/output');

const passwordValidationDemoData = require('../config/passwordValidationDemoData');

const writeFile = require('../modules/writeFile');

const list = require('../commands/list');
const readFile = require('../modules/readFile');

const controller = {
    enable: (args, resolve, reject) => {
        inquirer.prompt([
            {
                type: 'password',
                name: 'password',
                message: 'New password:',
                validate: (value) => {
                    if (value === '') {
                        return `Password can't be empty.`;
                    } else { return true }
                }
            },
            {
                type: 'password',
                name: 'confirm-password',
                message: 'Confirm password:',
            },
        ]).then(async (answers) => {
            if (answers.password === answers['confirm-password']) {
                output(args, '------------------------')
                output(args, 'IMPORTANT!')
                output(args, 'Remember your password!')
                output(args, 'Because if you forgot it, NO ONE CAN RECOVER YOUR PRIVATE KEYS!')
                output(args, '------------------------')
                const confirmationAnswer = await inquirer.prompt([{
                    type: 'confirm',
                    name: 'confirm',
                    message: 'Are you sure you want to enable password?',
                    default: false,
                }])

                if (confirmationAnswer.confirm === true) {
                    const encryptedPasswordValidationDemo = sjcl.encrypt(answers.password, passwordValidationDemoData, { cipher: 'aes' })
                    await writeFile(_p.passwordValidationDemo(), encryptedPasswordValidationDemo)

                    const keysList = await list({ params: { quiet: true } });
                    for (const keyName in keysList) {
                        if (keysList[keyName].private == true) {
                            const encryptedPrivateKey = sjcl.encrypt(answers.password, await readFile(_p.key(keyName).private, 'utf8'), { cipher: 'aes' })
                            await writeFile(_p.key(keyName).private, encryptedPrivateKey)
                        }
                    }

                    var currentConfig = await config.get()
                    currentConfig['password']['enabled'] = true
                    config.set(currentConfig)

                    output(args, 'Password enabled.')

                    resolve()
                } else {
                    reject(require('../functions/err')(`Canceled.`, { code: 'RSA_CLI:CANCELED_ENABLING_PASSWORD' }))
                }

            } else {
                reject(require('../functions/err')(`Password doesn't match.`, { code: 'RSA_CLI:PASSWORD_DOES_NOT_MATCH' }))
            }
        })
    },
    change: (args, resolve, reject) => {
        inquirer.prompt([{
            type: 'password',
            name: 'password',
            message: 'Old password:',
        }]).then(async ({ password: oldPassword }) => {
            try {
                if (sjcl.decrypt(oldPassword, await readFile(_p.passwordValidationDemo(), 'utf8')) === passwordValidationDemoData) {
                    inquirer.prompt([{
                        type: 'password',
                        name: 'password',
                        message: 'New password:',
                        validate: (value) => {
                            if (value === '') {
                                return `Password can't be empty.`;
                            } else { return true }
                        },
                    }]).then(({ password: newPassword }) => {
                        inquirer.prompt([{
                            type: 'confirm',
                            name: 'confirm',
                            message: 'Are you sure you want to change password?',
                            default: false,
                        }]).then(async ({ confirm }) => {
                            if (confirm == true) {
                                await writeFile(_p.passwordValidationDemo(),
                                    sjcl.encrypt(newPassword, passwordValidationDemoData, { cipher: 'aes' })
                                );

                                const keysList = await list({ params: { quiet: true } });
                                for (const keyName in keysList) {
                                    if (keysList[keyName].private == true) {
                                        const privateKey = sjcl.decrypt(oldPassword, await readFile(_p.key(keyName).private, 'utf8'))
                                        const encryptedPrivateKey = sjcl.encrypt(newPassword, privateKey, { cipher: 'aes' })
                                        await writeFile(_p.key(keyName).private, encryptedPrivateKey)
                                    }
                                }

                                output(args, 'Password changed.')

                                resolve()
                            } else {
                                reject(require('../functions/err')(`Canceled.`, { code: 'RSA_CLI:CANCELED_ENABLING_PASSWORD' }))
                            }
                        })
                    })
                } else {
                    reject(require('../functions/err')('Password is incorrect.', { code: 'RSA_CLI:PASSWORD_INCORRECT' }))
                }
            } catch (err) {
                if (err.message == `ccm: tag doesn't match`) {
                    reject(require('../functions/err')('Password is incorrect.', { code: 'RSA_CLI:PASSWORD_INCORRECT' }))
                }
            }
        })
    },
    disable: (args, resolve, reject) => {
        inquirer.prompt([{
            type: 'password',
            name: 'password',
            message: 'Password:',
        }]).then(async (answers) => {
            try {
                if (sjcl.decrypt(answers.password, await readFile(_p.passwordValidationDemo(), 'utf8')) == passwordValidationDemoData) {
                    fs.unlinkSync(_p.passwordValidationDemo())

                    const keysList = await list({ params: { quiet: true } });
                    for (const keyName in keysList) {
                        if (keysList[keyName].private == true) {
                            const decryptedPrivateKey = sjcl.decrypt(answers.password, await readFile(_p.key(keyName).private, 'utf8'))
                            await writeFile(_p.key(keyName).private, decryptedPrivateKey)
                        }
                    }

                    var currentConfig = await config.get()
                    currentConfig['password']['enabled'] = false
                    config.set(currentConfig)

                    output(args, 'Password disabled.')

                    resolve()
                } else {
                    reject(require('../functions/err')('Password is incorrect.', { code: 'RSA_CLI:PASSWORD_INCORRECT' }))
                }
            } catch (err) {
                if (err.message == `ccm: tag doesn't match`) {
                    reject(require('../functions/err')('Password is incorrect.', { code: 'RSA_CLI:PASSWORD_INCORRECT' }))
                }
            }
        })
    },
}

module.exports = (args) => {
    return new Promise(async (resolve, reject) => {
        const currentConfig = await config.get();

        switch (args.keyName) {
            case 'status':
                if (currentConfig['password']['enabled'] === true) {
                    output(args, 'Enabled.')
                    resolve(true);
                } else {
                    output(args, 'Disabled.')
                    resolve(false);
                }
                break;

            case 'enable':
                if (currentConfig['password']['enabled'] === true) {
                    reject(require('../functions/err')(`Password already enabled, do you mean changing your password?`, { code: 'RSA_CLI:PASSWORD_ENABLED_CANNOT_ENABLE' }))
                } else {
                    controller.enable(args, resolve, reject);
                }
                break;

            case 'disable':
                if (currentConfig['password']['enabled'] === true) {
                    controller.disable(args, resolve, reject);
                } else {
                    reject(require('../functions/err')(`Password not enabled, cannot disable.`, { code: 'RSA_CLI:PASSWORD_NOT_ENABLED_CANNOT_DISABLE' }))
                }
                break;

            case 'change':
                if (currentConfig['password']['enabled'] === true) {
                    controller.change(args, resolve, reject);
                } else {
                    reject(require('../functions/err')(`Password not enabled, cannot change.`, { code: 'RSA_CLI:PASSWORD_NOT_ENABLED_CANNOT_CHANGE' }))
                }
                break;

            default:
                reject(require('../functions/err')(typeof args.keyName != 'undefined' ? `Unknown sub-command '${args.keyName}'` : 'No sub-command provided', { code: 'RSA_CLI:UNKNOWN_SUB_COMMAND' }))
                break;
        }
    })
}
