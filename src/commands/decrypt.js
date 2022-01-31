const crypto = require('crypto');
const readFile = require('../modules/readFile')
const writeFile = require('../modules/writeFile')
const getKey = require('../functions/getKey')
const requestPassword = require('../functions/requestPassword');
const getString = require('../functions/getString')

module.exports = (args) => {
    return new Promise((resolve, reject) => {
        requestPassword(args).then((password) => {
            getKey(args.keyName, 'private', password).then(async (key) => {
                var toDecrypt;
                if (args.params.input) {
                    toDecrypt = Buffer.from(await readFile(args.params.input, 'utf8'), 'base64')
                } else {
                    try {
                        toDecrypt = Buffer.from(args.object, 'base64')
                    } catch (err) {
                        if (err.code == 'ERR_INVALID_ARG_TYPE') {
                            reject(require('../functions/err')(await getString('invalid-input'), { code: 'RSA_CLI:INVALID_ENCRYPTION_INPUT' }))
                        }
                    }
                }

                const decrypted = await crypto.privateDecrypt(key, toDecrypt).toString()

                if (!args.params.quiet) console.log(await getString('decrypted-with-key', {
                    a: args.params.input ? await getString('file-', { a: args.params.input }) : `'${args.object.slice(0, 12)}...${args.object.slice(args.object.length - 12, args.object.length)}'`,
                    b: args.keyName
                }))
                if (args.params.output) {
                    await writeFile(args.params.output, decrypted, 'utf8')
                    resolve(decrypted)
                } else {
                    if (!args.params.quiet) console.log(decrypted)
                    resolve(decrypted)
                }
            }).catch(async (err) => {
                if (err.code == 'ERR_OSSL_RSA_OAEP_DECODING_ERROR') {
                    reject(require('../functions/err')(await getString('failed-to-decrypt'), { code: 'RSA_CLI:FAILED_TO_DECRYPT' }))
                } else {
                    reject(err)
                }
            })
        }).catch(reject)
    })
}
