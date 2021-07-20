const os = require('os')

const getPath = {
    configDir: () => { return `${os.homedir()}/.rsa` },

    keysDir: () => { return `${getPath.configDir()}/keys` },

    key: (name) => { return {
        pair: `${getPath.configDir()}/keys/${name}`,
        public: `${getPath.configDir()}/keys/${name}/rsa.pub`,
        private: `${getPath.configDir()}/keys/${name}/rsa`,
    }}
}

module.exports = getPath