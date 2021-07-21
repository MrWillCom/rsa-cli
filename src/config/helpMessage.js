const chalk = require('chalk');

const _dash = chalk.gray('-');
const _$ = chalk.bold.cyan(`$`)

const helpMessage = 
`
RSA CLI is a command line tool for RSA encryption and decryption.

Usage: rsa <command> ...args

Commands:
    help     - show this help message
    version  - show version information
    generate - generate a key pair
    encrypt  - encrypt a message
    decrypt  - decrypt an encrypted message
    get      - show a key pair
    list     - list key pairs
    remove   - remove a key pair

rsa help <command> for more information on a command.

rsa@${require('../../package.json').version} ${process.execPath}
`

const version  = 
`
Show version information.

${_dash} Show version number:
  ${_$} rsa version
`

const generate =
`
Generate a key pair.

Alias: g

${_dash} Generate a key pair named [keyName] with default modulus length (2048):
  ${_$} rsa generate [keyName]

${_dash} Customized modulus length [modulusLength]:
  ${_$} rsa generate [keyName] -l [modulusLength]
`

const encrypt =
`
Encrypt a message.

Alias: e

${_dash} Encrypt [message] with [keyName]:
  ${_$} rsa e [keyName] [message]
`

const decrypt =
`
Decrypt an encrypted message.

Alias: d

${_dash} Decrypt [message] with [keyName]:
  ${_$} rsa d [keyName] [message]
`

const get =
`
Show a key pair.

${_dash} Show key pair [keyName]:
  ${_$} rsa get [keyName]

${_dash} Include private key:
  ${_$} rsa get [keyName] --private
`

const list =
`
List key pairs.

Alias: ls

${_dash} List key pairs:
  ${_$} rsa list
`

const remove =
`
Remove a key pair.

Alias: rm

${_dash} Remove key pair [keyName]:
  ${_$} rsa remove [keyName]
`

module.exports = {
    helpMessage,
    help: helpMessage,
    version,
    generate,
    encrypt,
    decrypt,
    get,
    list,
    remove,
}
