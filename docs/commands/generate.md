# Generate

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

## API

```ts
function RSA_CLI.generate({
    keyName: string,
    params: {
        'modulus-length'?: number, /* [optional] default to 2048 */
        quiet?: boolean,
    }
}): string
```
