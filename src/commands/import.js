const copyFile = require('../modules/copyFile')
const _p = require('../functions/path')
const fs = require('fs')

module.exports = (args) => {
    return new Promise((resolve, reject) => {
        const keysPath = _p.key(args.keyName)
        const keyPairPath = keysPath.pair
        const publicKeyPath = keysPath.public
        const privateKeyPath = keysPath.private

        const saveKeys = async () => {
            if (args.params.public) {
                await copyFile(args.params.public, publicKeyPath)
                console.log(`Imported public key of key pair '${args.keyName}'`)
            }
            if (args.params.private) {
                await copyFile(args.params.private, privateKeyPath)
                console.log(`Imported private key of key pair '${args.keyName}'`)
            }
            resolve()
        }

        if (fs.existsSync(keyPairPath)) {
            if (args.params.overwrite == true) { saveKeys() } else {
                console.error(`Key pair '${args.keyName}' already exists.\nTo overwrite, add '--overwrite'.`)
                resolve()
            }
        } else {
            saveKeys()
        }
    })
}
