const fs = require('fs');
const readFile = require('../modules/readFile');
const writeFile = require('../modules/writeFile');

const configFilePath = require('./path').config();
const defaultConfig = {
    password: {
        enabled: false,
    },
}

get = async () => {
    if (fs.existsSync(configFilePath)) {
        return JSON.parse(await readFile(configFilePath));
    } else {
        await writeFile(configFilePath, JSON.stringify(defaultConfig));
        return defaultConfig;
    }
}

set = async (newConfig) => {
    await writeFile(configFilePath, JSON.stringify(newConfig));
    return newConfig;
}

module.exports = { get, set }
