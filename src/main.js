const argv = require('minimist')(process.argv.slice(2));

const getCommand = (command) => {
    const alias = require('./config/commandAlias')
    return alias[command] ? alias[command] : command;
}

const getParams = (args) => {
    const alias = require('./config/paramsAlias')
    var params = {}
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

const main = async () => {
    switch (args.command) {
        case 'help':
            require('./commands/help')(args)
            break;
        case 'version':
            await require('./commands/version')(args)
            break;
        case 'generate':
            await require('./commands/generate')(args)
            break;
        case 'import':
            await require('./commands/import')(args)
            break;
        case 'encrypt':
            await require('./commands/encrypt')(args)
            break;
        case 'decrypt':
            await require('./commands/decrypt')(args)
            break;
        case 'get':
            await require('./commands/get')(args)
            break;
        case 'list':
            await require('./commands/list')(args)
            break;
        case 'remove':
            await require('./commands/remove')(args)
            break;

        default:
            const helpMessage = require('./config/helpMessage').helpMessage
            if (args.command) {
                console.log(`Invalid command '${args.command}'.\n${helpMessage}`)
            } else {
                console.log(`No command specified.\n${helpMessage}`)
            }
            break;
    }
}

main()
