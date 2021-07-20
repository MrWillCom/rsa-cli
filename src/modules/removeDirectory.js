const fs = require('fs');

const removeDirectory = (path) => {
    return new Promise((resolve, reject) => {
        fs.rmdir(path, (err) => {
            if (err) {
                if (err.code == 'ENOTEMPTY') {
                    fs.readdirSync(path).forEach(async (item) => {
                        const itemPath = path + '/' + item;
                        if (fs.statSync(itemPath).isDirectory()) {
                            await removeDirectory(itemPath)
                        } else {
                            fs.unlinkSync(itemPath);
                        }
                    })
                    removeDirectory(path).then(() => {
                        resolve()
                    })
                }
            } else {
                resolve();
            }
        });
    })
}

module.exports = removeDirectory
