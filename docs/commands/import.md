# Import

Import a key or a key pair.

Import a public key named `[keyName]` from `[publicKeyPath]`:

```sh
$ rsa import [keyName] --public [publicKeyPath]
```

## API

```ts
function RSA_CLI.import({
    keyName: string,
    params: {
        public?: string, /* [optional] path to public key*/
        private?: string, /* [optional] path to private key*/
    }
}): string, /* the key name */
```
