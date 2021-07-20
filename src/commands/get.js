const os = require('os');
const fs = require('fs');
const readFile = require('../modules/readFile')
const _p = require('../functions/path')

module.exports = (args) => {
    return new Promise(async (resolve, reject) => {
        const keysPath = _p.key(args.keyName)
        const keyPairPath = keysPath.pair
        const publicKeyPath = keysPath.public
        const privateKeyPath = keysPath.private

        if (fs.existsSync(keyPairPath)) {
            const publicKey = await readFile(publicKeyPath, 'utf8')
            console.log(`Public key of key pair '${args.keyName}':`)
            console.log(publicKey)
            if (args.params['private']) {
                const privateKey = await readFile(privateKeyPath, 'utf8')
                console.log(`Private key of key pair '${args.keyName}':`)
                console.log(privateKey)
                console.log(`------------------------`)
                console.log(`IMPORTANT!`)
                console.log(`NEVER GIVE YOUR PRIVATE KEY TO OTHERS. IF YOU FOUND YOUR PRIVATE KEY IS LEAKED, PLEASE GENERATE A NEW KEY PAIR!`)
                console.log(`------------------------`)
            }
            resolve()
        } else {
            console.log(`Key ${args.keyName} doesn't exists.`)
            resolve()
        }
    })
}
