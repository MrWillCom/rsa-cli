const messages = require('../config/helpMessage')

const getCommand = (command) => {
    const alias = require('../config/commandAlias')
    return alias[command] ? alias[command] : command;
}

module.exports = (args) => {
    if (args.keyName) {
        const command = getCommand(args.keyName)
        if (messages[command]) {
            console.log(messages[command])
        } else {
            console.log(`Command '${args.keyName}' doesn't exist.`)
        }
    } else {
        console.log(messages.helpMessage)
    }
}