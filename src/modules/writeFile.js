const fs = require('fs');

const writeFile = (path, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, (err) => {
            if (err) {
                if (err.code == 'ENOENT') {
                    const splittedPath = path.split("/")
                    splittedPath.length-- // remove the last item of the array
                    var testPath = ""
                    for (let i = 0; i < splittedPath.length; i++) {
                        testPath = testPath + splittedPath[i] + '/'
                        try {
                            const stats = fs.statSync(testPath)
                        } catch (subErr) {
                            if (subErr.code == 'ENOENT') {
                                fs.mkdirSync(testPath)
                            } else { reject(subErr) }
                        }
                    }
                    fs.writeFile(path, data, (err) => {
                        if (err) { reject(err) }
                        resolve()
                    })
                } else { reject(err) }
            }
            resolve()
        })
    })
}

module.exports = writeFile
