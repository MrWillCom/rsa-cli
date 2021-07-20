const fs = require('fs');
const _p = require('../functions/path')
const inquirer = require('inquirer');
const removeDirectory = require('../modules/removeDirectory')

module.exports = (args) => {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(`${_p.key(args.keyName).pair}`)) {
            inquirer.prompt([{
                type: 'confirm',
                name: 'confirm',
                message: `Are you sure to remove key '${args.keyName}'?`,
            }]).then((answers) => {
                if (answers.confirm === true) {
                    removeDirectory(`${_p.key(args.keyName).pair}`).then(() => {
                        console.log(`Removed key '${args.keyName}'.`)
                        resolve()
                    })
                } else {
                    resolve()
                }
            })
        } else {
            console.log(`Key '${args.keyName}' doesn't exist.`)
            resolve()
        }
    })
}
