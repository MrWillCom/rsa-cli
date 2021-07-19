const writeFile = require('./writeFile')
const readFile = require('./readFile')

const copyFile = (from, to) => {
    return new Promise((resolve, reject) => {
        readFile(from).then((data) => {
            writeFile(to, data).then(() => {
                resolve()
            }).catch((err) => { reject(err) })
        }).catch((err) => { reject(err) })
    })
}

module.exports = copyFile
