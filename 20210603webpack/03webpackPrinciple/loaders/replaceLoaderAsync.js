module.exports = function(source) {
    const callback = this.async()
    setTimeout(() => {
        const code = source.replace('webpack', this.query.name)
        callback(null, code)
    }, 1000)
}