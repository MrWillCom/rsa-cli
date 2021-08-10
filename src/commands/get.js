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
            if (!args.params.quiet) console.log(`Public key of key pair '${args.keyName}':`)
            if (!args.params.quiet) console.log(publicKey)
            if (args.params['private'] === true) {
                const privateKey = await readFile(privateKeyPath, 'utf8')
                if (!args.params.quiet) console.log(`Private key of key pair '${args.keyName}':`)
                if (!args.params.quiet) console.log(privateKey)
                if (!args.params.quiet) console.log(`------------------------`)
                if (!args.params.quiet) console.log(`IMPORTANT!`)
                if (!args.params.quiet) console.log(`NEVER GIVE YOUR PRIVATE KEY TO OTHERS. IF YOU FOUND YOUR PRIVATE KEY IS LEAKED, PLEASE GENERATE A NEW KEY PAIR!`)
                if (!args.params.quiet) console.log(`------------------------`)

                resolve({ public: publicKey, private: privateKey })
            } else {
                resolve({ public: publicKey })
            }
        } else {
            reject(require('../functions/err')(`Key ${args.keyName} doesn't exists.`, { code: 'RSA_CLI:KEY_NOT_EXIST' }))
        }
    })
}
