module.exports = {
    help: require('./commands/help'),
    version: require('./commands/version'),
    generate: require('./commands/generate'),
    import: require('./commands/import'),
    encrypt: require('./commands/encrypt'),
    decrypt: require('./commands/decrypt'),
    get: require('./commands/get'),
    list: require('./commands/list'),
    remove: require('./commands/remove'),
}
