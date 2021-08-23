const fs = require('fs');
const _p = require('../functions/path')
const inquirer = require('inquirer');
const removeDirectory = require('../modules/removeDirectory')

module.exports = (args) => {
    return new Promise((resolve, reject) => {
        if (typeof args.keyName == 'undefined') {
            reject(require('../functions/err')('No key name provided.', { code: 'RSA_CLI:CANNOT_GENERATE_KEY_WITHOUT_KEY_NAME' }))
        } else {
            if (fs.existsSync(`${_p.key(args.keyName).pair}`)) {
                const deleteKey = () => {
                    removeDirectory(`${_p.key(args.keyName).pair}`).then(() => {
                        if (!args.params.quiet) console.log(`Removed key '${args.keyName}'.`)
                        resolve(args.keyName)
                    })
                }

                if (args.params.quiet) {
                    deleteKey()
                } else {
                    inquirer.prompt([{
                        type: 'confirm',
                        name: 'confirm',
                        message: `Are you sure to remove key '${args.keyName}'?`,
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
                reject(require('../functions/err')(`Key '${args.keyName}' doesn't exist.`, { code: 'RSA_CLI:KEY_NOT_EXIST' }))
            }
        }
    })
}
