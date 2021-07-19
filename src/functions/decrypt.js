const crypto = require('crypto');
const os = require('os')
const fs = require('fs')
const readFile = require('../modules/readFile')

module.exports = (args) => {
    return new Promise(async (resolve, reject) => {
        const keyPairPath = `${os.homedir()}/.rsa/keys/${args.keyName}`
        const privateKeyPath = `${keyPairPath}/rsa`

        if (fs.existsSync(keyPairPath)) {
            const privateKey = await readFile(privateKeyPath)
            console.log(`Decrypted '${args.object.slice(0, 12)}...${args.object.slice(args.object.length - 12, args.object.length)}' with key '${args.keyName}':`)
            console.log(crypto.privateDecrypt(privateKey, Buffer.from(args.object, 'base64')).toString())
        } else {
            console.log(`Key ${args.keyName} doesn't exists.`)
            resolve()
        }
    })
}
