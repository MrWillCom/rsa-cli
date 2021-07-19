const fs = require('fs');

const readFile = (path, encoding) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, encoding ? encoding : undefined, (err, data) => {
            if (err) { reject(err) }
            resolve(data)
        })
    })
}

module.exports = readFile
