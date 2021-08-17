# Encrypt

Encrypt a message.

Encrypt `[message]` with `[keyName]`:

```sh
$ rsa encrypt [keyName] [message]
# or with alias:
$ rsa e [keyName] [message]
```

## API

```ts
function RSA_CLI.encrypt({
    keyName: string,
    object: string, /* the string to encrypt */
    params: {
        input?: string, /* [optional][not-stable] import data from file to encrypt */
        output?: string, /* [optional][not-stable] export encrypted data to file */
        quiet?: boolean, /* [optional] reduce any command-line output */
    }
}): string
```
