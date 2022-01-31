module.exports = (args) => {
    return new Promise((resolve, reject) => {
        const version = require('../../package.json').version;
        if (!args.params.quiet) console.log(`v${version}`);
        resolve(version);
    })
}