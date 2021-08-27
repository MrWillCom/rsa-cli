const os = require('os')

const getPath = {
    dataDir: () => { return `${os.homedir()}/.rsa` },

    keysDir: () => { return `${getPath.dataDir()}/keys` },

    key: (name) => {
        return {
            pair: `${getPath.dataDir()}/keys/${name}/`,
            public: `${getPath.dataDir()}/keys/${name}/rsa.pub`,
            private: `${getPath.dataDir()}/keys/${name}/rsa`,
        }
    },

    config: () => { return `${getPath.dataDir()}/config.json` },
    userConfig: () => { return `${getPath.dataDir()}/userConfig.json` },

    passwordValidationDemo: () => { return `${getPath.dataDir()}/password-validation-demo` },
}

module.exports = getPath