const helpMessage = 
`
RSA CLI is a command line tool for RSA encryption and decryption.

Usage: rsa <command> <keyName> <object> ...parameters

Commands:
    help      -  show this help message
    version   -  show version information
    generate  -  generate a key pair
    encrypt   -  encrypt a message
    decrypt   -  decrypt an encrypted message
    get       -  show a key pair
    list      -  list key pairs
    remove    -  remove a key pair

rsa@${require('../../package.json').version} ${process.execPath}
`

module.exports = helpMessage
