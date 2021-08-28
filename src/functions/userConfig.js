const fs = require('fs');
const readFile = require('../modules/readFile')
const writeFile = require('../modules/writeFile')

const defaultUserConfig = require('../config/defaultUserConfig')

const USER_CONFIG_PATH = require('./path').userConfig();

class userConfig {
    constructor() { }

    set(value) {
        for (const item in value) {
            this.config[item] = value[item];
            this.save();
        }
    }

    get(params) {
        if (!params) { params = {} }
        if (params.allowDefault !== false) {
            for (const keyDefault in defaultUserConfig) {
                if (this.config[keyDefault] == undefined) {
                    this.config[keyDefault] = defaultUserConfig[keyDefault];
                }
            }
        }

        return this.config;
    }

    async load() {
        if (fs.existsSync(USER_CONFIG_PATH)) {
            this.config = JSON.parse(await readFile(USER_CONFIG_PATH));
        } else {
            await writeFile(USER_CONFIG_PATH, JSON.stringify({}));
            this.config = {};
        }
    }

    async save() {
        await writeFile(USER_CONFIG_PATH, JSON.stringify(this.config));
    }
}

module.exports = new userConfig();
