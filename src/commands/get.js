const os = require('os');
const fs = require('fs');
const readFile = require('../modules/readFile')
const _p = require('../functions/path')
const config = require('../functions/config');
const getKey = require('../functions/getKey');
const output = require('../functions/output');
const inquirer = require('inquirer');
const sjcl = require('sjcl');

const printWarningAboutPrivateKey = (args) => {
    output(args, `------------------------`)
    output(args, `IMPORTANT!`)
    output(args, `NEVER GIVE YOUR PRIVATE KEY TO OTHERS. IF YOU FOUND YOUR PRIVATE KEY IS LEAKED, PLEASE GENERATE A NEW KEY PAIR!`)
    output(args, `------------------------`)
}

module.exports = (args) => {
    return new Promise(async (resolve, reject) => {
        const keysPath = _p.key(args.keyName)
        const keyPairPath = keysPath.pair
        const publicKeyPath = keysPath.public
        const privateKeyPath = keysPath.private

        if (fs.existsSync(keyPairPath)) {
            const publicKey = await readFile(publicKeyPath, 'utf8')
            if (!args.params.quiet) console.log(`Public key of key pair '${args.keyName}':`)
            if (!args.params.quiet) console.log(publicKey)
            if (args.params['private'] === true) {
                const currentConfig = await config.get()
                if (currentConfig['password']['enabled'] == true) {
                    if (typeof args.params.password != 'undefined') {
                        try {
                            if (sjcl.decrypt(args.params.password.toString(), await readFile(_p.passwordValidationDemo(), 'utf8')) === require('../config/passwordValidationDemoData')) {
                                const privateKey = await getKey(args.keyName, 'private', args.params.password.toString())

                                output(args, `Private key of key pair '${args.keyName}':`)
                                output(args, privateKey)
                                printWarningAboutPrivateKey(args)

                                resolve({ public: publicKey, private: privateKey })
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
                                    const privateKey = await getKey(args.keyName, 'private', password)

                                    output(args, `Private key of key pair '${args.keyName}':`)
                                    output(args, privateKey)
                                    printWarningAboutPrivateKey(args)

                                    resolve({ public: publicKey, private: privateKey })
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
            } else {
                resolve({ public: publicKey })
            }
        } else {
            reject(require('../functions/err')(`Key ${args.keyName} doesn't exists.`, { code: 'RSA_CLI:KEY_NOT_EXIST' }))
        }
    })
}
