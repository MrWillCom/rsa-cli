# RSA CLI

A command line tool for RSA encryption and decryption.

```
$ rsa generate myKey -l 1024
Generated a new key pair: 'myKey'
$ rsa encrypt myKey 'Hello, World!'
Encrypted 'Hello, World!' with key 'myKey':
.........
$ rsa decrypt myKey '.........'
Decrypted '.........' with key 'myKey
Hello, World!
```

## Installation

Download the executable from [Releases](https://github.com/MrWillCom/rsa-cli/releases), you don't even install it. If you want, you can rename this to `rsa` and add it to `PATH`.

