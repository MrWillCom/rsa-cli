const getKey = require('../functions/getKey');
const output = require('../functions/output');
const requestPassword = require('../functions/requestPassword')
const getString = require('../functions/getString')

const printWarningAboutPrivateKey = async (args) => {
    output(args, `------------------------`)
    output(args, await getString('warning-about-private-key'))
    output(args, `------------------------`)
}

module.exports = (args) => {
    return new Promise((resolve, reject) => {
        getKey(args.keyName, 'public').then(async (publicKey) => {
            output(args, await getString('public-key-of-key-pair', { a: args.keyName }))
            output(args, publicKey)

            if (args.params['private'] === true) {
                requestPassword(args).then(async (password) => {
                    getKey(args.keyName, 'private', password).then(async (privateKey) => {
                        output(args, await getString('private-key-of-key-pair', { a: args.keyName }))
                        output(args, privateKey)
                        await printWarningAboutPrivateKey(args)

                        resolve({ public: publicKey, private: privateKey })
                    }).catch(reject)
                }).catch(reject)
            } else {
                resolve({ public: publicKey })
            }
        }).catch(reject)
    })
}
