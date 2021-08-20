const crypto = require('crypto');
const fs = require('fs')
const writeFile = require('../modules/writeFile')
const _p = require('../functions/path')
const _c = require('../config/variables')
const config = require('../functions/config')
const sjcl = require('sjcl')
const inquirer = require('inquirer');
const readFile = require('../modules/readFile');
const passwordValidationDemoData = require('../config/passwordValidationDemoData')

module.exports = (args) => {
    return new Promise((resolve, reject) => {
        crypto.generateKeyPair('rsa', {
            modulusLength: args.params['modulus-length'] || _c.generate.modulusLength,
            publicKeyEncoding: {
                type: 'pkcs1',
                format: 'pem',
            },
            privateKeyEncoding: {
                type: 'pkcs1',
                format: 'pem',
            }
        }, async (err, publicKey, privateKey) => {
            if (err) reject(err)
            const keysPath = _p.key(args.keyName)
            const keyPairPath = keysPath.pair
            const publicKeyPath = keysPath.public
            const privateKeyPath = keysPath.private
            const saveKeyPair = async () => {

                const saveKeys = async (password) => {
                    await writeFile(publicKeyPath, publicKey)

                    if (password !== null) {
                        privateKey = sjcl.encrypt(password, privateKey)
                    }
                    await writeFile(privateKeyPath, privateKey)

                    if (!args.params.quiet) console.log(`Generated a new key pair: '${args.keyName}'`)

                    resolve(args.keyName)
                }

                const currentConfig = await config.get()
                if (currentConfig['password']['enabled'] == true) {
                    if (typeof args.params.password != 'undefined') {
                        try {
                            if (sjcl.decrypt(args.params.password.toString(), await readFile(_p.passwordValidationDemo(), 'utf8')) === passwordValidationDemoData) {
                                await saveKeys(args.params.password.toString())
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
                                if (sjcl.decrypt(password, await readFile(_p.passwordValidationDemo(), 'utf8')) === passwordValidationDemoData) {
                                    await saveKeys(password)
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
                } else {
                    await saveKeys(null)
                }
            }
            if (fs.existsSync(keyPairPath)) {
                if (args.params.overwrite == true) { saveKeyPair() } else {
                    reject(require('../functions/err')(`Key pair '${args.keyName}' already exists.\nTo overwrite, add '--overwrite'.`, { code: 'RSA_CLI:KEY_ALREADY_EXISTS' }))
                }
            } else {
                saveKeyPair()
            }
        })
    })
}