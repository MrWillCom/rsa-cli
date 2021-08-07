const crypto = require('crypto');
const fs = require('fs')
const writeFile = require('../modules/writeFile')
const _p = require('../functions/path')
const _c = require('../config/variables')

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
                await writeFile(privateKeyPath, privateKey)
                console.log(`Generated a new key pair: '${args.keyName}'`)
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