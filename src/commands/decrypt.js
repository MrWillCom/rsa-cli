const crypto = require('crypto');
const readFile = require('../modules/readFile')
const writeFile = require('../modules/writeFile')
const getKey = require('../functions/getKey')
const requestPassword = require('../functions/requestPassword');

module.exports = (args) => {
    return new Promise((resolve, reject) => {
        requestPassword(args).then((password) => {
            getKey(args.keyName, 'private', password).then(async (key) => {
                var toDecrypt;
                if (args.params.input) {
                    toDecrypt = Buffer.from(await readFile(args.params.input, 'utf8'), 'base64')
                } else {
                    toDecrypt = Buffer.from(args.object, 'base64')
                }

                const decrypted = await crypto.privateDecrypt(key, toDecrypt).toString()

                if (!args.params.quiet) console.log(`Decrypted ${args.params.input ?
                    `file ${args.params.input}` :
                    `'${args.object.slice(0, 12)}...${args.object.slice(args.object.length - 12, args.object.length)}' with key '${args.keyName}'`}:`)
                if (args.params.output) {
                    await writeFile(args.params.output, decrypted, 'utf8')
                    resolve(decrypted)
                } else {
                    if (!args.params.quiet) console.log(decrypted)
                    resolve(decrypted)
                }
            }).catch(reject)
        }).catch(reject)
    })
}
