const crypto = require('crypto');
const fs = require('fs')
const readFile = require('../modules/readFile')
const writeFile = require('../modules/writeFile')
const _p = require('../functions/path')

module.exports = (args) => {
    return new Promise(async (resolve, reject) => {
        const keysPath = _p.key(args.keyName)
        const keyPairPath = keysPath.pair
        const privateKeyPath = keysPath.private

        if (fs.existsSync(keyPairPath)) {
            const privateKey = await readFile(privateKeyPath)
            var toDecrypt;
            if (args.params.input) {
                toDecrypt = Buffer.from(await readFile(args.params.input, 'utf8'), 'base64')
            } else {
                toDecrypt = Buffer.from(args.object, 'base64')
            }
            const decrypted = await crypto.privateDecrypt(privateKey, toDecrypt).toString()
            console.log(`Decrypted ${args.params.input ?
                `file ${args.params.input}` :
                `'${args.object.slice(0, 12)}...${args.object.slice(args.object.length - 12, args.object.length)}' with key '${args.keyName}'`}:`)
            if (args.params.output) {
                await writeFile(args.params.output, decrypted, 'utf8')
                resolve(decrypted)
            } else {
                console.log(decrypted)
                resolve(decrypted)
            }
        } else {
            reject(require('../functions/err')(`Key '${args.keyName}' doesn't exist.`, { code: 'RSA_CLI:KEY_NOT_EXIST' }))
        }
    })
}
