# Decrypt

Decrypt an encrypted message.

Decrypt `[message]` with `[keyName]`:

```sh
$ rsa decrypt [keyName] [message]
# or:
$ rsa d [keyName] [message]
```

## API

```ts
function RSA_CLI.decrypt({
    keyName: string,
    object: string, /* the string to decrypt */
    params: {
        input?: string, /* [optional][not-stable] import data from file to decrypt */
        output?: string, /* [optional][not-stable] export decrypted data to file */
        quiet?: boolean, /* [optional] reduce any command-line output */
    }
}): string
```
