module.exports = (str, from, to) => {
    while (str.search(from) != -1) {
        str = str.replace(from, to)
    }
    return str
}