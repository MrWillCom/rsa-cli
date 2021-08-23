const crypto = require('crypto');
const fs = require('fs')
const writeFile = require('../modules/writeFile')
const _p = require('../functions/path')
const _c = require('../config/variables')
const sjcl = require('sjcl')
const requestPassword = require('../functions/requestPassword');

module.exports = (args) => {
    return new Promise((resolve, reject) => {
        if(typeof args.keyName == 'undefined'){
            reject(require('../functions/err')('No key name provided.', { code: 'RSA_CLI:CANNOT_GENERATE_KEY_WITHOUT_KEY_NAME' }))
        }

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

            const saveKeyPair = async () => {
                const saveKeys = async (password) => {
                    await writeFile(keysPath.public, publicKey)

                    if (password !== null) {
                        privateKey = sjcl.encrypt(password, privateKey)
                    }
                    await writeFile(keysPath.private, privateKey)

                    if (!args.params.quiet) console.log(`Generated a new key pair: '${args.keyName}'`)

                    resolve(args.keyName)
                }

                requestPassword(args).then((password) => {
                    saveKeys(password)
                }).catch(reject)
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