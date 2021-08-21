const inquirer = require('inquirer')
const sjcl = require('sjcl')
const readFile = require('../modules/readFile')
const config = require('./config.js')
const demoData = require('../config/passwordValidationDemoData')
const _p = require('../functions/path')

module.exports = (args, options) => {
    return new Promise(async (resolve, reject) => {
        const verifyPassword = async (password) => {
            try {
                if (sjcl.decrypt(password, await readFile(_p.passwordValidationDemo(), 'utf8')) === demoData) {
                    resolve(password)
                }
            } catch (err) {
                if (err.message == `ccm: tag doesn't match`) {
                    reject(require('../functions/err')('Password is incorrect.', { code: 'RSA_CLI:PASSWORD_INCORRECT' }))
                } else {
                    reject(err)
                }
            }
        }

        const currentConfig = await config.get()
        if (currentConfig['password']['enabled'] == true) {
            if (typeof args.params.password != 'undefined') {
                verifyPassword(args.params.password.toString())
            } else {
                var message = 'Password:'
                if (typeof options != 'undefined') {
                    message = options.message ? options.message : message
                }
                inquirer.prompt([{
                    type: 'password',
                    name: 'password',
                    message,
                }]).then(({ password }) => {
                    verifyPassword(password)
                })
            }
        } else {
            resolve(null)
        }
    })
}