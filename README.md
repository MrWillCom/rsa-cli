<p align="center"><img src="./icon.png" alt="The logo of RSA CLI" width="84" height="84"></p>

<h3 align="center">RSA CLI</h3>

<p align="center">A command line tool for RSA encryption and decryption.</p>

<p align="center"><a href="https://rsa.js.org/docs/installation">Get Started</a> · <a href="https://rsa.js.org/docs">Docs</a></p>

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
