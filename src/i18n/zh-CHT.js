const chalk = require('chalk');

const _dash = chalk.gray('-');
const _$ = chalk.bold.cyan(`$`);

const helpMessage =
  `
RSA CLI 是一個用於 RSA 加密解密的命令行工具.
用法: rsa <command> ...args
指令:
  工具:
    help     ${_dash} 顯示此幫助信息
    version  ${_dash} 顯示版本信息
    config   ${_dash} 配置 RSA CLI
  加密解密:
    generate ${_dash} 生成密鑰對
    import   ${_dash} 導入密鑰（對）
    encrypt  ${_dash} 加密信息
    decrypt  ${_dash} 解密密文
    get      ${_dash} 顯示密鑰對
    list     ${_dash} 列出密鑰對
    remove   ${_dash} 刪除密鑰對
  安全:
    password ${_dash} 配置密碼以保護私鑰
要了解更多關於某個指令的信息:
${_$} rsa help <command>
rsa@${require('../../package.json').version} ${process.execPath}
`

const version =
`
顯示版本信息.
${_dash} 顯示版本號:
  ${_$} rsa version
`

const config =
  `
配置 RSA CLI.
${_dash} 獲取配置項 [key]:
  ${_$} rsa config get [key]
${_dash} 將配置項 [key] 設為 [value]:
  ${_$} rsa config set [key] [value]
${_dash} 刪除配置項 [key]:
  ${_$} rsa config set [key]
  ${chalk.grey(`或:`)}
  ${_$} rsa config set [key] unset
`

const generate =
  `
生成密鑰對.
別名: g
${_dash} 生成一個名為 [keyName] 且模數長度為默認（2048）的密鑰對:
  ${_$} rsa generate [keyName]
${_dash} 使用自定義模數長度 [modulusLength]:
  ${_$} rsa generate [keyName] --modulus-length [modulusLength]
  ${chalk.grey(`或:`)}
  ${_$} rsa generate [keyName] -l [modulusLength]
`

const _import =
`
導入密鑰對.
${_dash} 從 [publicKeyPath] 和 [privateKeyPath] 導入一個名為 [keyName] 的密鑰對:
  ${_$} rsa import [keyName] --public [publicKeyPath] --private [privateKeyPath]
`

const encrypt =
  `
加密信息.
別名: e
${_dash} 用密鑰 [keyName] 加密 [message]:
  ${_$} rsa encrypt [keyName] [message]
`

const decrypt =
  `
解密密文.
別名: d
${_dash} 用密鑰 [keyName] 解密 [message]:
  ${_$} rsa decrypt [keyName] [message]
`

const get =
  `
顯示密鑰對.
${_dash} 顯示密鑰對 [keyName]:
  ${_$} rsa get [keyName]
${_dash} 包括私鑰:
  ${_$} rsa get [keyName] --private
`

const list =
  `
列出密鑰對.
別名: ls
${_dash} 列出密鑰對:
  ${_$} rsa list
`

const remove =
  `
刪除密鑰對.
別名: rm
${_dash} 刪除密鑰對 [keyName]:
  ${_$} rsa remove [keyName]
`

const password =
  `
配置密碼以保護私鑰.
別名: passwd
${_dash} 獲取當前狀態:
  ${_$} rsa password status
${_dash} 啟用密碼:
  ${_$} rsa password enable
${_dash} 關閉密碼:
  ${_$} rsa password disable
${_dash} 更改密碼:
  ${_$} rsa password change
${chalk.grey(`────────────────────────────────────`)}
對於某些需要密碼的指令，你可以在被要求輸入時再輸入，或在你的指令後追加一個參數:
  ${_$} rsa <command> --password [password]
  ${chalk.grey(`或:`)}
  ${_$} rsa <command> -p [password]
`

module.exports = {
  'invalid-command':                                              `無效的指令 '%a'.\n%b`,
  'no-command-specified':                                         `未指定指令.\n%a`,
  'command-not-exist':                                            `指令 '%a' 不存在.`,
  'invalid-input':                                                `無效輸入.`,
  'encrypted-with-key':                                           `已用 '%b' 加密 %a:`,
  'data-too-large-for-key-size':                                  `對於此密鑰的長度, 你要加密的信息過大.`,
  'decrypted-with-key':                                           `已用 '%b' 解密 %a:`,
  'file-':                                                        `文件 %a`,
  'failed-to-decrypt':                                            `解密失敗.`,
  'no-key-name-provided':                                         `未提供密鑰名.`,
  'generated-a-new-key-pair':                                     `已生成一對新密鑰: '%a'`,
  'key-pair-already-exists-to-overwrite-add-overwrite':           `密鑰對 '%a' 已存在.\n要覆蓋舊密鑰, 加上 '--overwrite'.`,
  'public-key-of-key-pair':                                       `密鑰對 '%a' 的公鑰:`,
  'private-key-of-key-pair':                                      `密鑰對 '%a' 的私鑰:`,
  'warning-about-private-key':                                    `註意!\n永遠不要把你的私鑰提供給他人. 如果你發現你的私鑰已經泄露, 請生成一對新密鑰!`,
  'imported-public-key-of-key-pair':                              `已為密鑰對 '%a' 導入了公鑰.`,
  'imported-private-key-of-key-pair':                             `已為密鑰對 '%a' 導入了私鑰.`,
  'key-library-is-empty':                                         `密鑰庫是空的.`,
  'are-you-sure-to-remove-key':                                   `你確定要刪除密鑰 '%a'?`,
  'removed-key':                                                  `已刪除密鑰 '%a'.`,
  'key-doesnt-exist':                                             `密鑰 '%a' 不存在.`,
  'password':                                                     `密碼:`,
  'new-password':                                                 `新密碼:`,
  'old-password':                                                 `舊密碼:`,
  'confirm-password':                                             `確認密碼:`,
  'password-is-incorrect':                                        `密碼錯誤.`,
  'password-cant-be-empty':                                       `密碼不能留空.`,
  'are-you-sure-you-want-to-enable-password':                     `你確定要啟用密碼?`,
  'warning-about-enabling-password':                              `註意!\n記住你的密碼!\n因為如果你忘記了密碼, 沒有人能為你恢復私鑰!`,
  'password-enabled':                                             `密碼已啟用.`,
  'canceled':                                                     `已取消.`,
  'password-doesnt-match':                                        `密碼不匹配.`,
  'are-you-sure-to-change-password':                              `你確定要更改密碼?`,
  'password-changed':                                             `密碼已更改.`,
  'password-disabled':                                            `密碼已關閉.`,
  'enabled':                                                      `已啟用.`,
  'disabled':                                                     `已關閉.`,
  'password-already-enabled-do-you-mean-changing-your-password':  `密碼已啟用, 你是要更改密碼嗎?`,
  'password-not-enabled-cannot-disable':                          `密碼尚未啟用, 不能關閉.`,
  'password-not-enabled-cannot-change':                           `密碼尚未啟用, 不能更改.`,
  'unknown-sub-command':                                          `未知的子命令 '%a'.`,
  'no-sub-command-provided':                                      `未提供子命令.`,
  'get-more-instructions-by-running':                             `要獲取更多指引, 請執行:`,
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
