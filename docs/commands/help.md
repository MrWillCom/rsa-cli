# Help

Show help message.

```sh
$ rsa help
```

Show detailed help message for `<command>`:

```sh
$ rsa help <command>
```

## API

```ts
function RSA_CLI.help(
    keyName: string, /* this is used as the command name, not actually the key name */
    params?: {
        quiet?: boolean,
    }
): string
```
