const helpMessage = 
`
rsat is a command line tool for RSA encryption and decryption.

Usage: rsat <command> <keyName> <object> ...parameters

Commands:
    help - show this help message
    version - show version information
    generate - generate a key pair
    encrypt - encrypt a message
    decrypt - decrypt an encrypted message
    ls - list key pairs
    rm - remove a key pair

rsat@${require('../../package.json').version} ${process.execPath}
`

module.exports = helpMessage
