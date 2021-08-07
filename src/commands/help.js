const messages = require('../config/helpMessage')

const getCommand = (command) => {
    const alias = require('../config/commandAlias')
    return alias[command] ? alias[command] : command;
}

module.exports = (args) => {
    return new Promise((resolve, reject) => {
        if (args.keyName) {
            const command = getCommand(args.keyName)
            if (messages[command]) {
                console.log(messages[command])
                resolve(messages[command])
            } else {
                reject(require('../functions/err')(`Command '${args.keyName}' doesn't exist.`, { code: 'RSA_CLI:COMMAND_NOT_EXIST' }))
            }
        } else {
            console.log(messages.helpMessage)
            resolve(messages.helpMessage)
        }
    })
}