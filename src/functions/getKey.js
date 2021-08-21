const sjcl = require('sjcl')
const fs = require('fs')

const readFile = require('../modules/readFile')
const _p = require('../functions/path')

module.exports = (keyName, type, password) => {
    return new Promise((resolve, reject) => {
        const handleErrorKeyNotExist = (err) => {
            if (err.code == 'ENOENT') {
                reject(require('./err')(`Key '${keyName}' doesn't exist.`, { code: 'RSA_CLI:KEY_NOT_EXIST' }))
            } else {
                reject(err)
            }
        }

        if (fs.existsSync(_p.keysDir(keyName))) {
            if (type == 'public') {
                readFile(_p.key(keyName).public, 'utf8').then((content) => { resolve(content) }).catch(handleErrorKeyNotExist)
            } else if (type == 'private') {
                if (password != null) {
                    readFile(_p.key(keyName).private, 'utf8').then((content) => {
                        resolve(sjcl.decrypt(password, content))
                    }).catch(handleErrorKeyNotExist)
                } else {
                    readFile(_p.key(keyName).private, 'utf8').then((content) => { resolve(content) }).catch(handleErrorKeyNotExist)
                }
            }
        } else {
            reject(require('./err')(`Key '${keyName}' doesn't exist.`, { code: 'RSA_CLI:KEY_NOT_EXIST' }))
        }
    })
}