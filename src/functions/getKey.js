const sjcl = require('sjcl')
const fs = require('fs')

const readFile = require('../modules/readFile')
const _p = require('../functions/path')

module.exports = (keyName, type, password) => {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(_p.keysDir(keyName))) {
            if (type == 'public') {
                readFile(_p.key(keyName).public, 'utf8').then((content) => { resolve(content) })
            } else if (type == 'private') {
                if (password != null) {
                    readFile(_p.key(keyName).private, 'utf8').then((content) => {
                        resolve(sjcl.decrypt(password, content))
                    })
                } else {
                    readFile(_p.key(keyName).private, 'utf8').then((content) => { resolve(content) })
                }
            }
        } else {
            reject(require('./err')(`Key '${args.keyName}' doesn't exist.`, { code: 'RSA_CLI:KEY_NOT_EXIST' }))
        }
    })
}