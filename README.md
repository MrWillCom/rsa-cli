# RSA CLI

A command line tool for RSA encryption and decryption.

```sh
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

## Usage

### Generate

Generate a key pair.

Generate a key pair named `[keyName]` with default modulus length (2048):

```sh
$ rsa generate [keyName]
# or with alias:
$ rsa g [keyName]
```

To customize modulus length, use `-l`:

```sh
$ rsa generate [keyName] -l [modulusLength]
```

### Import

Import a key or a key pair.

Import a public key named `[keyName]` from `[publicKeyPath]`:

```sh
$ rsa import [keyName] --public [publicKeyPath]
```

### Encrypt

Encrypt a message.

Encrypt `[message]` with `[keyName]`:

```sh
$ rsa encrypt [keyName] [message]
# or with alias:
$ rsa e [keyName] [message]
```

### Decrypt

Decrypt an encrypted message.

Decrypt `[message]` with `[keyName]`:

```sh
$ rsa decrypt [keyName] [message]
# or:
$ rsa d [keyName] [message]
```
