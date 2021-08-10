#!/usr/bin/env node

const argv = require('minimist')(process.argv.slice(2));

const getCommand = (command) => {
    const alias = require('./config/commandAlias')
    return alias[command] ? alias[command] : command;
}

const getParams = (args) => {
    const alias = require('./config/paramsAlias')
    const list = require('./config/paramsList')
    var params = {}
    for (const param of list) {
        params[param] = false;
    }
    for (const k in args) {
        if (k === '_') continue;
        const val = args[k];
        var key = k.replace(/^-/, '').replace(/^--/, '');
        key = alias[key] ? alias[key] : key;
        params[key] = val;
    }
    return params;
}

var args = {
    command: getCommand(argv._[0]),
    keyName: argv._[1],
    object: argv._[2],
    params: getParams(argv),
}

const logError = (err) => { if (!args.params.quiet) console.log(err.message) }

const main = async () => {
    if (args.params.version) {
        await require('./commands/version')(args).catch(logError)
        return
    }

    switch (args.command) {
        case 'help':
            await require('./commands/help')(args).catch(logError)
            break;
        case 'version':
            await require('./commands/version')(args).catch(logError)
            break;
        case 'generate':
            await require('./commands/generate')(args).catch(logError)
            break;
        case 'import':
            await require('./commands/import')(args).catch(logError)
            break;
        case 'encrypt':
            await require('./commands/encrypt')(args).catch(logError)
            break;
        case 'decrypt':
            await require('./commands/decrypt')(args).catch(logError)
            break;
        case 'get':
            await require('./commands/get')(args).catch(logError)
            break;
        case 'list':
            await require('./commands/list')(args).catch(logError)
            break;
        case 'remove':
            await require('./commands/remove')(args).catch(logError)
            break;

        default:
            const helpMessage = require('./config/helpMessage').helpMessage
            if (args.command) {
                if (!args.params.quiet) console.log(`Invalid command '${args.command}'.\n${helpMessage}`)
            } else {
                if (!args.params.quiet) console.log(`No command specified.\n${helpMessage}`)
            }
            break;
    }
}

main()
