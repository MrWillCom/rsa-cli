const copyFile = require('../modules/copyFile')
const _p = require('../functions/path')
const fs = require('fs')
const output = require('../functions/output')
const sjcl = require('sjcl')
const readFile = require('../modules/readFile')
const writeFile = require('../modules/writeFile')
const requestPassword = require('../functions/requestPassword')
const getString = require('../functions/getString')

module.exports = (args) => {
    return new Promise(async (resolve, reject) => {
        if (typeof args.keyName == 'undefined') {
            reject(require('../functions/err')(await getString('no-key-name-provided'), { code: 'RSA_CLI:CANNOT_IMPORT_KEY_WITHOUT_KEY_NAME' }))
        }

        const keysPath = _p.key(args.keyName)
        const keyPairPath = keysPath.pair

        const saveKeys = async () => {
            if (args.params.public) {
                await copyFile(args.params.public, keysPath.public)
                output(args, await getString('imported-public-key-of-key-pair', { a: args.keyName }))
            }
            if (args.params.private) {
                requestPassword(args).then(async (password) => {
                    await writeFile(
                        keysPath.private,
                        sjcl.encrypt(password, await readFile(args.params.private, 'utf8')),
                    )
                    output(args, await getString('imported-private-key-of-key-pair', { a: args.keyName }))

                    resolve(args.keyName)
                }).catch(reject)
            }
        }

        if (fs.existsSync(keyPairPath)) {
            if (args.params.overwrite == true) { saveKeys() } else {
                reject(require('../functions/err')(await getString('key-pair-already-exists-to-overwrite-add-overwrite', { a: args.keyName }), { code: 'RSA_CLI:KEY_ALREADY_EXISTS' }))
            }
        } else {
            saveKeys()
        }
    })
}
