const copyFile = require('../modules/copyFile')
const _p = require('../functions/path')
const fs = require('fs')
const output = require('../functions/output')
const sjcl = require('sjcl')
const readFile = require('../modules/readFile')
const writeFile = require('../modules/writeFile')
const requestPassword = require('../functions/requestPassword')

module.exports = (args) => {
    return new Promise((resolve, reject) => {
        const keysPath = _p.key(args.keyName)
        const keyPairPath = keysPath.pair

        const saveKeys = async () => {
            if (args.params.public) {
                await copyFile(args.params.public, keysPath.public)
                output(`Imported public key of key pair '${args.keyName}'`)
            }
            if (args.params.private) {
                requestPassword(args).then(async (password) => {
                    await writeFile(
                        keysPath.private,
                        sjcl.encrypt(password, await readFile(args.params.private, 'utf8')),
                    )
                    output(args, `Imported private key of key pair '${args.keyName}'`)

                    resolve(args.keyName)
                }).catch(reject)
            }
        }

        if (fs.existsSync(keyPairPath)) {
            if (args.params.overwrite == true) { saveKeys() } else {
                reject(require('../functions/err')(`Key pair '${args.keyName}' already exists.\nTo overwrite, add '--overwrite'.`, { code: 'RSA_CLI:KEY_ALREADY_EXISTS' }))
            }
        } else {
            saveKeys()
        }
    })
}
