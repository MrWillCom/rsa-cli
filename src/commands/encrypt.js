const crypto = require('crypto');
const os = require('os')
const fs = require('fs')
const readFile = require('../modules/readFile')

module.exports = (args) => {
    return new Promise(async (resolve, reject) => {
        const keyPairPath = `${os.homedir()}/.rsa/keys/${args.keyName}`
        const publicKeyPath = `${keyPairPath}/rsa.pub`

        if (fs.existsSync(keyPairPath)) {
            const publicKey = await readFile(publicKeyPath)
            console.log(`Encrypted '${args.object}' with key '${args.keyName}':`)
            console.log(crypto.publicEncrypt(publicKey, Buffer.from(args.object)).toString('base64'))
            resolve()
        } else {
            console.log(`Key ${args.keyName} doesn't exists.`)
            resolve()
        }
    })
}