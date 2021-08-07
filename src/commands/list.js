const fs = require('fs');
const _p = require('../functions/path')

module.exports = (args) => {
    return new Promise((resolve, reject) => {
        fs.readdir(`${_p.keysDir()}`, (err, items) => {
            if (err) {
                if (err.code = 'ENOENT') {
                    reject({ message: `Keys library is empty.`, code: 'RSA_CLI:KEY_LIB_EMPTY' })
                } else {
                    reject(err)
                }
            }
            for (const i in items) {
                if (fs.statSync(`${_p.keysDir()}/${items[i]}`).isDirectory()) {
                    console.log(`${items[i]}`)
                }
            }
            resolve(items)
        })
    })
}