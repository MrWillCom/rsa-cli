const fs = require('fs');
const _p = require('../functions/path')

module.exports = (args) => {
    return new Promise((resolve, reject) => {
        fs.readdir(`${_p.keysDir()}`, async (err, items) => {
            if (err) {
                if (err.code = 'ENOENT') {
                    reject(require('../functions/err')(await getString('key-library-is-empty'), { code: 'RSA_CLI:KEY_LIB_EMPTY' }))
                } else {
                    reject(err)
                }
            }
            var keysList = {};
            for (const i in items) {
                const keysPath = _p.key(items[i]);
                if (fs.statSync(keysPath.pair).isDirectory()) {
                    keysList[items[i]] = {
                        public: fs.existsSync(keysPath.public),
                        private: fs.existsSync(keysPath.private),
                    };
                }
            }
            if (!args.params.quiet) console.table(keysList)
            resolve(keysList)
        })
    })
}