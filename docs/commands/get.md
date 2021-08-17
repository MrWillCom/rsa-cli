# Get

Show a key pair.

Show key pair `[keyName]`:

```sh
$ rsa get [keyName]
```

To include private key, add `--private` as suffix:

```sh
$ rsa get [keyName] --private
```

## API

```ts
function RSA_CLI.get({
    keyName: string,
    params: {
        private?: boolean, /* [optional] default to `false`. it will return both public and private key only when `true` */
        quiet?: boolean,
    }
}): {
    public: string,
    private?: string,
}
```
