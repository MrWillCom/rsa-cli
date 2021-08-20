const sjcl = require('sjcl')
const fs = require('fs')

const readFile = require('../modules/readFile')
const _p = require('../functions/path')
const config = require('../functions/config')

/**
 * @param {string} keyName
 * @param {string} type
 * @param {string} password only required when getting private key
 * @returns {string}
 */
module.exports = async (keyName, type, password) => {
    if (fs.existsSync(_p.keysDir(keyName))) {
        if (type == 'public') {
            return await readFile(_p.key(keyName).private, 'utf8')
        } else if (type == 'private') {
            const currentConfig = await config.get()
            if (currentConfig['password']['enabled'] == true) {
                try {
                    return sjcl.decrypt(password, await readFile(_p.key(keyName).private, 'utf8'))
                } catch (err) {
                    if (err.message == `ccm: tag doesn't match`) {
                        throw require('./err')('Password is incorrect.', { code: 'RSA_CLI:PASSWORD_INCORRECT' })
                    }
                }
            } else {
                return await readFile(_p.key(keyName).private, 'utf8')
            }
        }
    } else {
        throw require('./err')(`Key '${args.keyName}' doesn't exist.`, { code: 'RSA_CLI:KEY_NOT_EXIST' })
    }
}