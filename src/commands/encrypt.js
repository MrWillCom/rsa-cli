const crypto = require('crypto');
const fs = require('fs')
const readFile = require('../modules/readFile')
const writeFile = require('../modules/writeFile')
const _p = require('../functions/path')

module.exports = (args) => {
    return new Promise(async (resolve, reject) => {
        const keysPath = _p.key(args.keyName)
        const keyPairPath = keysPath.pair
        const publicKeyPath = keysPath.public

        if (fs.existsSync(keyPairPath)) {
            const publicKey = await readFile(publicKeyPath)
            var toEncrypt;
            if (args.params.input) {
                toEncrypt = await readFile(args.params.input)
            } else {
                toEncrypt = Buffer.from(args.object)
            }
            const encrypted = crypto.publicEncrypt(publicKey, toEncrypt).toString('base64')
            if (!args.params.quiet) console.log(`Encrypted ${args.params.input ? `file ${args.params.input}` : `'${args.object}'`} with key '${args.keyName}':`)
            if (args.params.output) {
                await writeFile(args.params.output, encrypted)
                resolve(encrypted)
            } else {
                if (!args.params.quiet) console.log(encrypted)
                resolve(encrypted)
            }
        } else {
            reject(require('../functions/err')(`Key '${args.keyName}' doesn't exist.`, { code: 'RSA_CLI:KEY_NOT_EXIST' }))
        }
    })
}