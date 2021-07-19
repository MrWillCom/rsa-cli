const argv = require('minimist')(process.argv.slice(2));
const helpMessage = require('./config/helpMessage')

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
            console.log(helpMessage)
            break;
        case 'generate':
            await require('./functions/generate')(args)
            break;
        case 'encrypt':
            await require('./functions/encrypt')(args)
            break;
        case 'decrypt':
            await require('./functions/decrypt')(args)
            break;

        default:
            if (args.command) {
                console.log(`Invalid command ${args.command}.\n${helpMessage}`)
            } else {
                console.log(`No command specified.\n${helpMessage}`)
            }
            break;
    }
}

main()
