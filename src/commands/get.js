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
    return new Promise(async (resolve, reject) => {
        const publicKey = await getKey(args.keyName, 'public')
        if (!args.params.quiet) console.log(`Public key of key pair '${args.keyName}':`)
        if (!args.params.quiet) console.log(publicKey)

        if (args.params['private'] === true) {
            requestPassword(args).then(async (password) => {
                const privateKey = await getKey(args.keyName, 'private', password)

                output(args, `Private key of key pair '${args.keyName}':`)
                output(args, privateKey)
                printWarningAboutPrivateKey(args)

                resolve({ public: publicKey, private: privateKey })
            }).catch(reject)
        } else {
            resolve({ public: publicKey })
        }
    })
}
