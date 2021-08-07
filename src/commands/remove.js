const fs = require('fs');
const _p = require('../functions/path')
const inquirer = require('inquirer');
const removeDirectory = require('../modules/removeDirectory')

module.exports = (args) => {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(`${_p.key(args.keyName).pair}`)) {
            const deleteKey = () => {
                removeDirectory(`${_p.key(args.keyName).pair}`).then(() => {
                    console.log(`Removed key '${args.keyName}'.`)
                    resolve(args.keyName)
                })
            }

            // `outputClear` is a flag to request less I/O interaction in terminal for API usage.
            if (args.params.outputClear === true) { 
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
    })
}
