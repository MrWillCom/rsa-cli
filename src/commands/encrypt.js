const crypto = require('crypto');
const readFile = require('../modules/readFile')
const writeFile = require('../modules/writeFile')
const getKey = require('../functions/getKey')

module.exports = (args) => {
    return new Promise(async (resolve, reject) => {
        getKey(args.keyName, 'public').then(async (key) => {
            var toEncrypt;
            if (args.params.input) {
                toEncrypt = await readFile(args.params.input)
            } else {
                toEncrypt = Buffer.from(args.object)
            }
            const encrypted = crypto.publicEncrypt(key, toEncrypt).toString('base64')
            if (!args.params.quiet) console.log(`Encrypted ${args.params.input ? `file ${args.params.input}` : `'${args.object}'`} with key '${args.keyName}':`)
            if (args.params.output) {
                await writeFile(args.params.output, encrypted)
                resolve(encrypted)
            } else {
                if (!args.params.quiet) console.log(encrypted)
                resolve(encrypted)
            }
        }).catch(reject)
    })
}