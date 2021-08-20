const copyFile = require('../modules/copyFile')
const _p = require('../functions/path')
const fs = require('fs')
const config = require('../functions/config')
const output = require('../functions/output')
const sjcl = require('sjcl')
const readFile = require('../modules/readFile')
const writeFile = require('../modules/writeFile')
const inquirer = require('inquirer')

module.exports = (args) => {
    return new Promise((resolve, reject) => {
        const keysPath = _p.key(args.keyName)
        const keyPairPath = keysPath.pair
        const publicKeyPath = keysPath.public
        const privateKeyPath = keysPath.private

        const saveKeys = async () => {
            if (args.params.public) {
                await copyFile(args.params.public, publicKeyPath)
                if (!args.params.quiet) console.log(`Imported public key of key pair '${args.keyName}'`)
            }
            if (args.params.private) {
                const currentConfig = await config.get()
                if (currentConfig['password']['enabled']) {
                    if (typeof args.params.password != 'undefined') {
                        try {
                            if (sjcl.decrypt(args.params.password.toString(), await readFile(_p.passwordValidationDemo(), 'utf8')) === require('../config/passwordValidationDemoData')) {
                                await writeFile(
                                    privateKeyPath,
                                    sjcl.encrypt(args.params.password.toString(), await readFile(args.params.private, 'utf8')),
                                )
                                output(args, `Imported private key of key pair '${args.keyName}'`)

                                resolve(args.keyName)
                            }
                        } catch (err) {
                            if (err.message == `ccm: tag doesn't match`) {
                                reject(require('../functions/err')('Password is incorrect.', { code: 'RSA_CLI:PASSWORD_INCORRECT' }))
                            } else {
                                reject(err)
                            }
                        }
                    } else {
                        inquirer.prompt([{
                            type: 'password',
                            name: 'password',
                            message: 'Password:'
                        }]).then(async ({ password }) => {
                            try {
                                if (sjcl.decrypt(password, await readFile(_p.passwordValidationDemo(), 'utf8')) === require('../config/passwordValidationDemoData')) {
                                    await writeFile(
                                        privateKeyPath,
                                        sjcl.encrypt(password, await readFile(args.params.private, 'utf8')),
                                    )
                                    output(args, `Imported private key of key pair '${args.keyName}'`)

                                    resolve(args.keyName)
                                }
                            } catch (err) {
                                if (err.message == `ccm: tag doesn't match`) {
                                    reject(require('../functions/err')('Password is incorrect.', { code: 'RSA_CLI:PASSWORD_INCORRECT' }))
                                } else {
                                    reject(err)
                                }
                            }
                        })
                    }
                }
            }
        }

        if (fs.existsSync(keyPairPath)) {
            if (args.params.overwrite == true) { saveKeys() } else {
                reject(require('../functions/err')(`Key pair '${args.keyName}' already exists.\nTo overwrite, add '--overwrite'.`, { code: 'RSA_CLI:KEY_ALREADY_EXISTS' }))
            }
        } else {
            saveKeys()
        }
    })
}
