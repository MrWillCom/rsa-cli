module.exports = (args) => {
    return new Promise((resolve, reject) => {
        const version = require('../../package.json').version;
        console.log(`v${version}`);
        resolve();
    })
}