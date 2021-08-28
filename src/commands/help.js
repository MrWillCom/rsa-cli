module.exports = async (args) => {
    return new Promise(async (resolve, reject) => {
        const messages = await require('../config/helpMessage')()
        const getString = require('../functions/getString')

        const getCommand = (command) => {
            const alias = require('../config/commandAlias')
            return alias[command] ? alias[command] : command;
        }

        if (args.keyName) {
            const command = getCommand(args.keyName)
            if (messages[command]) {
                if (!args.params.quiet) console.log(messages[command])
                resolve(messages[command])
            } else {
                reject(require('../functions/err')(await getString('command-not-exist', { a: args.keyName }), { code: 'RSA_CLI:COMMAND_NOT_EXIST' }))
            }
        } else {
            if (!args.params.quiet) console.log(messages.helpMessage)
            resolve(messages.helpMessage)
        }
    })
}