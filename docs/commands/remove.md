# Remove

Remove a key pair.

Remove key pair `[keyName]`:

```sh
$ rsa remove [keyName]
# or:
$ rsa rm [keyName]
```

## API

```ts
function RSA_CLI.remove({
    keyName: string,
    params?: {
        quiet?: boolean, /* if `true`, the key will be deleted without confirmation */
    }
}): string /* name of the removed key */
```
