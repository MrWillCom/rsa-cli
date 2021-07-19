const crypto = require('crypto');
const os = require('os')
const fs = require('fs')
const writeFile = require('../modules/writeFile')

module.exports = (args) => {
    return new Promise((resolve, reject) => {
        crypto.generateKeyPair('rsa', {
            modulusLength: args.params['modulus-length'],
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
            const keyPairPath = `${os.homedir()}/.rsat/keys/${args.keyName}`
            const publicKeyPath = `${keyPairPath}/rsa.pub`
            const privateKeyPath = `${keyPairPath}/rsa`
            const saveKeyPair = async () => {
                await writeFile(publicKeyPath, publicKey)
                await writeFile(privateKeyPath, privateKey)
                console.log(`Generated a new key pair: '${args.keyName}'`)
                resolve()
            }
            if (fs.existsSync(keyPairPath)) {
                if (args.params.overwrite == true) { saveKeyPair() } else {
                    console.error(`Key pair '${args.keyName}' already exists.\nTo overwrite, add --overwrite.`)
                    resolve()
                }
            } else {
                saveKeyPair()
            }
        })
    })
}