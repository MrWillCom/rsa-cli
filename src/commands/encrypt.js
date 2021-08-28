const crypto = require('crypto');
const readFile = require('../modules/readFile')
const writeFile = require('../modules/writeFile')
const getKey = require('../functions/getKey')
const getString = require('../functions/getString')

module.exports = (args) => {
    return new Promise(async (resolve, reject) => {
        getKey(args.keyName, 'public').then(async (key) => {
            var toEncrypt;
            if (args.params.input) {
                toEncrypt = await readFile(args.params.input)
            } else {
                try {
                    toEncrypt = Buffer.from(args.object)
                } catch (err) {
                    if (err.code == 'ERR_INVALID_ARG_TYPE') {
                        reject(require('../functions/err')(await getString('invalid-input'), { code: 'RSA_CLI:INVALID_ENCRYPTION_INPUT' }))
                    }
                }
            }

            const encrypted = crypto.publicEncrypt(key, toEncrypt).toString('base64')

            if (!args.params.quiet) console.log(await getString('encrypted-with-key', {
                a: args.params.input ? await getString('file-', { a: args.params.input }) : `'${args.object}'`,
                b: args.keyName
            }))
            if (args.params.output) {
                await writeFile(args.params.output, encrypted)
                resolve(encrypted)
            } else {
                if (!args.params.quiet) console.log(encrypted)
                resolve(encrypted)
            }
        }).catch(async (err) => {
            if (err.code == 'ERR_OSSL_RSA_DATA_TOO_LARGE_FOR_KEY_SIZE') {
                reject(require('../functions/err')(await getString('data-too-large-for-key-size'), { code: 'RSA_CLI:DATA_TOO_LARGE_FOR_KEY_SIZE' }))
            } else {
                reject(err)
            }
        })
    })
}