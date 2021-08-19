const fs = require('fs');
const scanDirectory = require('./scanDirectory');

const removeDirectory = (path) => {
    return new Promise((resolve, reject) => {
        scanDirectory(path, { includeDirectories: true }).then((list) => {
            for (const item of list) {
                fs.statSync(item).isDirectory() ? fs.rmdirSync(item) : fs.unlinkSync(item);
            }
            fs.rmdirSync(path)
            resolve()
        })
    })
}

module.exports = removeDirectory
