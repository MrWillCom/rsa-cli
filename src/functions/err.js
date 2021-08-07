module.exports = (message, options) => {
    var err = new Error(message)
    
    if (options && typeof options === 'object') {
        for (const key in options) {
            err[key] = options[key]
        }
    }

    return err
}
