const userConfig = require('../functions/userConfig')

module.exports = async () => {
    await userConfig.load()

    var helpMessage = require(`../i18n/${await userConfig.get()['lang']}`).helpMessage

    return helpMessage
}
