const getKey = require('../functions/getKey');
const output = require('../functions/output');
const requestPassword = require('../functions/requestPassword')

const printWarningAboutPrivateKey = (args) => {
    output(args, `------------------------`)
    output(args, `IMPORTANT!`)
    output(args, `NEVER GIVE YOUR PRIVATE KEY TO OTHERS. IF YOU FOUND YOUR PRIVATE KEY IS LEAKED, PLEASE GENERATE A NEW KEY PAIR!`)
    output(args, `------------------------`)
}

module.exports = (args) => {
    return new Promise((resolve, reject) => {
        getKey(args.keyName, 'public').then((publicKey) => {
            output(`Public key of key pair '${args.keyName}':`)
            output(publicKey)

            if (args.params['private'] === true) {
                requestPassword(args).then((password) => {
                    getKey(args.keyName, 'private', password).then((privateKey) => {
                        output(args, `Private key of key pair '${args.keyName}':`)
                        output(args, privateKey)
                        printWarningAboutPrivateKey(args)

                        resolve({ public: publicKey, private: privateKey })
                    }).catch(reject)
                }).catch(reject)
            } else {
                resolve({ public: publicKey })
            }
        }).catch(reject)
    })
}
