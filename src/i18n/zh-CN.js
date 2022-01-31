const chalk = require('chalk');

const _dash = chalk.gray('-');
const _$ = chalk.bold.cyan(`$`);

const helpMessage =
  `
RSA CLI 是一个用于 RSA 加密解密的命令行工具.

用法: rsa <command> ...args

指令:
  工具:
    help     ${_dash} 显示此帮助信息
    version  ${_dash} 显示版本信息
    config   ${_dash} 配置 RSA CLI

  加密解密:
    generate ${_dash} 生成密钥对
    import   ${_dash} 导入密钥（对）
    encrypt  ${_dash} 加密信息
    decrypt  ${_dash} 解密密文
    get      ${_dash} 显示密钥对
    list     ${_dash} 列出密钥对
    remove   ${_dash} 删除密钥对

  安全:
    password ${_dash} 配置密码以保护私钥

要了解更多关于某个指令的信息:
${_$} rsa help <command>

rsa@${require('../../package.json').version} ${process.execPath}
`

const version =
`
显示版本信息.

${_dash} 显示版本号:
  ${_$} rsa version
`

const config =
  `
配置 RSA CLI.

${_dash} 获取配置项 [key]:
  ${_$} rsa config get [key]

${_dash} 将配置项 [key] 设为 [value]:
  ${_$} rsa config set [key] [value]

${_dash} 删除配置项 [key]:
  ${_$} rsa config set [key]
  ${chalk.grey(`或:`)}
  ${_$} rsa config set [key] unset

${_dash} 列出配置项:
  ${_$} rsa config list
`

const generate =
  `
生成密钥对.

别名: g

${_dash} 生成一个名为 [keyName] 且模数长度为默认（2048）的密钥对:
  ${_$} rsa generate [keyName]

${_dash} 使用自定义模数长度 [modulusLength]:
  ${_$} rsa generate [keyName] --modulus-length [modulusLength]
  ${chalk.grey(`或:`)}
  ${_$} rsa generate [keyName] -l [modulusLength]
`

const _import =
`
导入密钥对.

${_dash} 从 [publicKeyPath] 和 [privateKeyPath] 导入一个名为 [keyName] 的密钥对:
  ${_$} rsa import [keyName] --public [publicKeyPath] --private [privateKeyPath]
`

const encrypt =
  `
加密信息.

别名: e

${_dash} 用密钥 [keyName] 加密 [message]:
  ${_$} rsa encrypt [keyName] [message]
`

const decrypt =
  `
解密密文.

别名: d

${_dash} 用密钥 [keyName] 解密 [message]:
  ${_$} rsa decrypt [keyName] [message]
`

const get =
  `
显示密钥对.

${_dash} 显示密钥对 [keyName]:
  ${_$} rsa get [keyName]

${_dash} 包括私钥:
  ${_$} rsa get [keyName] --private
`

const list =
  `
列出密钥对.

别名: ls

${_dash} 列出密钥对:
  ${_$} rsa list
`

const remove =
  `
删除密钥对.

别名: rm

${_dash} 删除密钥对 [keyName]:
  ${_$} rsa remove [keyName]
`

const password =
  `
配置密码以保护私钥.

别名: passwd

${_dash} 获取当前状态:
  ${_$} rsa password status

${_dash} 启用密码:
  ${_$} rsa password enable

${_dash} 关闭密码:
  ${_$} rsa password disable

${_dash} 更改密码:
  ${_$} rsa password change

${chalk.grey(`────────────────────────────────────`)}

对于某些需要密码的指令，你可以在被要求输入时再输入，或在你的指令后追加一个参数:
  ${_$} rsa <command> --password [password]
  ${chalk.grey(`或:`)}
  ${_$} rsa <command> -p [password]
`

module.exports = {
  'invalid-command':                                              `无效的指令 '%a'.\n%b`,
  'no-command-specified':                                         `未指定指令.\n%a`,
  'command-not-exist':                                            `指令 '%a' 不存在.`,
  'invalid-input':                                                `无效输入.`,
  'encrypted-with-key':                                           `已用 '%b' 加密 %a:`,
  'data-too-large-for-key-size':                                  `对于此密钥的长度, 你要加密的信息过大.`,
  'decrypted-with-key':                                           `已用 '%b' 解密 %a:`,
  'file-':                                                        `文件 %a`,
  'failed-to-decrypt':                                            `解密失败.`,
  'no-key-name-provided':                                         `未提供密钥名.`,
  'generated-a-new-key-pair':                                     `已生成一对新密钥: '%a'`,
  'key-pair-already-exists-to-overwrite-add-overwrite':           `密钥对 '%a' 已存在.\n要覆盖旧密钥, 加上 '--overwrite'.`,
  'public-key-of-key-pair':                                       `密钥对 '%a' 的公钥:`,
  'private-key-of-key-pair':                                      `密钥对 '%a' 的私钥:`,
  'warning-about-private-key':                                    `注意!\n永远不要把你的私钥提供给他人. 如果你发现你的私钥已经泄露, 请生成一对新密钥!`,
  'imported-public-key-of-key-pair':                              `已为密钥对 '%a' 导入了公钥.`,
  'imported-private-key-of-key-pair':                             `已为密钥对 '%a' 导入了私钥.`,
  'key-library-is-empty':                                         `密钥库是空的.`,
  'are-you-sure-to-remove-key':                                   `你确定要删除密钥 '%a'?`,
  'removed-key':                                                  `已删除密钥 '%a'.`,
  'key-doesnt-exist':                                             `密钥 '%a' 不存在.`,
  'password':                                                     `密码:`,
  'new-password':                                                 `新密码:`,
  'old-password':                                                 `旧密码:`,
  'confirm-password':                                             `确认密码:`,
  'password-is-incorrect':                                        `密码错误.`,
  'password-cant-be-empty':                                       `密码不能留空.`,
  'are-you-sure-you-want-to-enable-password':                     `你确定要启用密码?`,
  'warning-about-enabling-password':                              `注意!\n记住你的密码!\n因为如果你忘记了密码, 没有人能为你恢复私钥!`,
  'password-enabled':                                             `密码已启用.`,
  'canceled':                                                     `已取消.`,
  'password-doesnt-match':                                        `密码不匹配.`,
  'are-you-sure-to-change-password':                              `你确定要更改密码?`,
  'password-changed':                                             `密码已更改.`,
  'password-disabled':                                            `密码已关闭.`,
  'enabled':                                                      `已启用.`,
  'disabled':                                                     `已关闭.`,
  'password-already-enabled-do-you-mean-changing-your-password':  `密码已启用, 你是要更改密码吗?`,
  'password-not-enabled-cannot-disable':                          `密码尚未启用, 不能关闭.`,
  'password-not-enabled-cannot-change':                           `密码尚未启用, 不能更改.`,
  'unknown-sub-command':                                          `未知的子命令 '%a'.`,
  'no-sub-command-provided':                                      `未提供子命令.`,
  'get-more-instructions-by-running':                             `要获取更多指引, 请执行:`,
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
