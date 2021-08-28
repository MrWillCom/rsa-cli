const userConfig = require('./userConfig')
const replaceAll = require('../modules/replaceAll')

module.exports = async (key, replacementList) => {
    await userConfig.load()

    var str = require(`../i18n/${await userConfig.get()['lang']}`)[key]

    if (replacementList) {
        for (const pattern in replacementList) {
            const replacement = replacementList[pattern]
            str = replaceAll(str, `%${pattern}`, replacement)
        }
    }

    return str
}
