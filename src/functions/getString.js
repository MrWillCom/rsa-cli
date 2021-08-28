const userConfig = require('./userConfig')
const fs = require('fs')
const readFile = require('../modules/readFile')
const replaceAll = require('../modules/replaceAll')

module.exports = async (key, replacementList) => {
    await userConfig.load()

    var str = await (async () => {
        try {
            return require(`../i18n/${await userConfig.get()['lang']}`)[key]
        } catch (err) {
            if (err.code == 'MODULE_NOT_FOUND') {
                return require(`../i18n/${require('../config/defaultUserConfig').lang}`)[key]
            }
        }
    })()

    if (replacementList) {
        for (const pattern in replacementList) {
            const replacement = replacementList[pattern]
            str = replaceAll(str, `%${pattern}`, replacement)
        }
    }

    return str
}
