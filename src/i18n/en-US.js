const chalk = require('chalk');

const _dash = chalk.gray('-');
const _$ = chalk.bold.cyan(`$`);

const helpMessage =
  `
RSA CLI is a command line tool for RSA encryption and decryption.

Usage: rsa <command> ...args

Commands:
  Utilities:
    help     ${_dash} show this help message
    version  ${_dash} show version information
    config   ${_dash} configure RSA CLI

  En/Decrypting:
    generate ${_dash} generate a key pair
    import   ${_dash} import a key (pair)
    encrypt  ${_dash} encrypt a message
    decrypt  ${_dash} decrypt an encrypted message
    get      ${_dash} show a key pair
    list     ${_dash} list key pairs
    remove   ${_dash} remove a key pair

  Security:
    password ${_dash} configure password to protect private keys

for more information on a command:
${_$} rsa help <command>

rsa@${require('../../package.json').version} ${process.execPath}
`

const version =
  `
Show version information.

${_dash} Show version number:
  ${_$} rsa version
`

const config =
  `
Configure RSA CLI.

${_dash} Get config [key]:
  ${_$} rsa config get [key]

${_dash} Set config [key] to [value]:
  ${_$} rsa config set [key] [value]

${_dash} Delete config [key]:
  ${_$} rsa config set [key]
  ${chalk.grey(`or:`)}
  ${_$} rsa config set [key] unset

${_dash} List config:
  ${_$} rsa config list
`

const generate =
  `
Generate a key pair.

Alias: g

${_dash} Generate a key pair named [keyName] with default modulus length (2048):
  ${_$} rsa generate [keyName]

${_dash} Customized modulus length [modulusLength]:
  ${_$} rsa generate [keyName] --modulus-length [modulusLength]
  ${chalk.grey(`or:`)}
  ${_$} rsa generate [keyName] -l [modulusLength]
`

const _import =
  `
Import a key (pair).

${_dash} Import a key named [keyName] from [publicKeyPath] and [privateKeyPath]:
  ${_$} rsa import [keyName] --public [publicKeyPath] --private [privateKeyPath]
`

const encrypt =
  `
Encrypt a message.

Alias: e

${_dash} Encrypt [message] with [keyName]:
  ${_$} rsa encrypt [keyName] [message]
`

const decrypt =
  `
Decrypt an encrypted message.

Alias: d

${_dash} Decrypt [message] with [keyName]:
  ${_$} rsa decrypt [keyName] [message]
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

const password =
  `
Configure password to protect private keys.

Alias: passwd

${_dash} Check status:
  ${_$} rsa password status

${_dash} Enable password:
  ${_$} rsa password enable

${_dash} Disable password:
  ${_$} rsa password disable

${_dash} Change password:
  ${_$} rsa password change

${chalk.grey(`────────────────────────────────────`)}

For the commands which require a password, you can either enter the password when asking you to do so, or you can add a flag after your command:
  ${_$} rsa <command> --password [password]
  ${chalk.grey(`or:`)}
  ${_$} rsa <command> -p [password]
`

module.exports = {
  'invalid-command':                                              `Invalid command '%a'.\n%b`,
  'no-command-specified':                                         `No command specified.\n%a`,
  'command-not-exist':                                            `Command '%a' doesn't exist.`,
  'invalid-input':                                                `Invalid input.`,
  'encrypted-with-key':                                           `Encrypted %a with key '%b':`,
  'data-too-large-for-key-size':                                  `Data too large for key size.`,
  'decrypted-with-key':                                           `Decrypted %a with key '%b':`,
  'file-':                                                        `file %a`,
  'failed-to-decrypt':                                            `Failed to decrypt.`,
  'no-key-name-provided':                                         `No key name provided.`,
  'generated-a-new-key-pair':                                     `Generated a new key pair: '%a'`,
  'key-pair-already-exists-to-overwrite-add-overwrite':           `Key pair '%a' already exists.\nTo overwrite, add '--overwrite'.`,
  'public-key-of-key-pair':                                       `Public key of key pair '%a':`,
  'private-key-of-key-pair':                                      `Private key of key pair '%a':`,
  'warning-about-private-key':                                    `IMPORTANT!\nNEVER GIVE YOUR PRIVATE KEY TO OTHERS. IF YOU FOUND YOUR PRIVATE KEY IS LEAKED, PLEASE GENERATE A NEW KEY PAIR!`,
  'imported-public-key-of-key-pair':                              `Imported public key of key pair '%a'.`,
  'imported-private-key-of-key-pair':                             `Imported private key of key pair '%a'.`,
  'key-library-is-empty':                                         `Key library is empty.`,
  'are-you-sure-to-remove-key':                                   `Are you sure to remove key '%a'?`,
  'removed-key':                                                  `Removed key '%a'.`,
  'key-doesnt-exist':                                             `Key '%a' doesn't exist.`,
  'password':                                                     `Password:`,
  'new-password':                                                 `New password:`,
  'old-password':                                                 `Old password:`,
  'confirm-password':                                             `Confirm password:`,
  'password-is-incorrect':                                        `Password is incorrect.`,
  'password-cant-be-empty':                                       `Password can't be empty.`,
  'are-you-sure-you-want-to-enable-password':                     `Are you sure you want to enable password?`,
  'warning-about-enabling-password':                              `IMPORTANT!\nRemember your password!\nBecause if you forgot it, NO ONE CAN RECOVER YOUR PRIVATE KEYS!`,
  'password-enabled':                                             `Password enabled.`,
  'canceled':                                                     `Canceled.`,
  'password-doesnt-match':                                        `Password doesn't match.`,
  'are-you-sure-to-change-password':                              `Are you sure to change password?`,
  'password-changed':                                             `Password changed.`,
  'password-disabled':                                            `Password disabled.`,
  'enabled':                                                      `Enabled.`,
  'disabled':                                                     `Disabled.`,
  'password-already-enabled-do-you-mean-changing-your-password':  `Password already enabled, do you mean changing your password?`,
  'password-not-enabled-cannot-disable':                          `Password not enabled, cannot disable.`,
  'password-not-enabled-cannot-change':                           `Password not enabled, cannot change.`,
  'unknown-sub-command':                                          `Unknown sub-command '%a'.`,
  'no-sub-command-provided':                                      `No sub-command provided.`,
  'get-more-instructions-by-running':                             `Get more instructions by running:`,
  helpMessage: {
    helpMessage,
    help: helpMessage,
    version,
    config,
    generate,
    import: _import,
    encrypt,
    decrypt,
    get,
    list,
    remove,
    password,
  }
}
