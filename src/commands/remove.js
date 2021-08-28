const fs = require('fs');
const _p = require('../functions/path')
const inquirer = require('inquirer');
const removeDirectory = require('../modules/removeDirectory')
const getString = require('../functions/getString')

module.exports = (args) => {
    return new Promise(async (resolve, reject) => {
        if (typeof args.keyName == 'undefined') {
            reject(require('../functions/err')(await getString('no-key-name-provided'), { code: 'RSA_CLI:CANNOT_REMOVE_KEY_WITHOUT_KEY_NAME' }))
        } else {
            if (fs.existsSync(`${_p.key(args.keyName).pair}`)) {
                const deleteKey = () => {
                    removeDirectory(`${_p.key(args.keyName).pair}`).then(async () => {
                        if (!args.params.quiet) console.log(await getString('removed-key', { a: args.keyName }))
                        resolve(args.keyName)
                    })
                }

                if (args.params.quiet) {
                    deleteKey()
                } else {
                    inquirer.prompt([{
                        type: 'confirm',
                        name: 'confirm',
                        message: await getString('are-you-sure-to-remove-key', { a: args.keyName }),
                        default: false,
                    }]).then((answers) => {
                        if (answers.confirm === true) {
                            deleteKey()
                        } else {
                            resolve()
                        }
                    })
                }
            } else {
                reject(require('../functions/err')(await getString('key-doesnt-exist', { a: args.keyName }), { code: 'RSA_CLI:KEY_NOT_EXIST' }))
            }
        }
    })
}
