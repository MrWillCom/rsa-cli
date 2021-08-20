const crypto = require('crypto');
const fs = require('fs')
const writeFile = require('../modules/writeFile')
const _p = require('../functions/path')
const _c = require('../config/variables')
const config = require('../functions/config')
const sjcl = require('sjcl')
const inquirer = require('inquirer')

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
                await writeFile(publicKeyPath, publicKey)

                const savePrivateKey = async (password) => {
                    if (password !== null) {
                        privateKey = sjcl.encrypt(password, privateKey)
                    }
                    await writeFile(privateKeyPath, privateKey)

                    if (!args.params.quiet) console.log(`Generated a new key pair: '${args.keyName}'`)
                }

                const currentConfig = await config.get()
                if (currentConfig['password']['enabled'] == true) {
                    if (typeof args.params.password != 'undefined') {
                        await savePrivateKey(args.params.password.toString())
                    } else {
                        inquirer.prompt([{
                            type: 'password',
                            name: 'password',
                            message: 'Password:'
                        }]).then(async ({ password }) => {
                            await savePrivateKey(password)
                        })
                    }
                } else {
                    await savePrivateKey(null)
                }
                resolve(args.keyName)
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