const fs = require('fs');

const scanDirectory = (path, options) => {
    path = path.slice(0, path.length - 1)
    var fileList = []
    return new Promise(async (resolve, reject) => {
        try {
            const items = fs.readdirSync(`${path}`)
            for (const item of items) {
                const stat = fs.statSync(`${path}/${item}`)
                if (stat.isDirectory()) {
                    fileList = fileList.concat(await scanDirectory(`${path}/${item}/`))
                    if (typeof options.includeDirectories == 'boolean' && options.includeDirectories === true) {
                        fileList = fileList.concat([`${path}/${item}/`])
                    }
                } else {
                    fileList.push(`${path}/${item}`)
                }
            }
            resolve(fileList)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = scanDirectory
