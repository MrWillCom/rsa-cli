const crypto = require('crypto');
const fs = require('fs')
const readFile = require('../modules/readFile')
const writeFile = require('../modules/writeFile')
const _p = require('../functions/path')
const getKey = require('../functions/getKey')
const config = require('../functions/config');
const inquirer = require('inquirer');

const decrypt = async (key, args, resolve, reject) => {
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
}

module.exports = (args) => {
    return new Promise(async (resolve, reject) => {
        const keysPath = _p.key(args.keyName)
        const keyPairPath = keysPath.pair
        const privateKeyPath = keysPath.private

        if (fs.existsSync(keyPairPath)) {
            const currentConfig = await config.get()
            if (currentConfig['password']['enabled'] == true) {
                if (typeof args.params.password != 'undefined') {
                    getKey(args.keyName, 'private', args.params.password.toString()).then(async (privateKey) => {
                        await decrypt(privateKey, args, resolve, reject)
                    }).catch(reject)
                } else {
                    inquirer.prompt([{
                        type: 'password',
                        name: 'password',
                        message: 'Password:'
                    }]).then(async ({ password }) => {
                        getKey(args.keyName, 'private', password).then(async (privateKey) => {
                            await decrypt(privateKey, args, resolve, reject)
                        }).catch(reject)
                    })
                }
            } else {
                getKey(args.keyName, 'private').then(async (privateKey) => {
                    await decrypt(privateKey, args, resolve, reject)
                }).catch(reject)
            }
        } else {
            reject(require('../functions/err')(`Key '${args.keyName}' doesn't exist.`, { code: 'RSA_CLI:KEY_NOT_EXIST' }))
        }
    })
}
