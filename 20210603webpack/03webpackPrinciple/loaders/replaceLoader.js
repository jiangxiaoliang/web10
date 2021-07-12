// module.exports = function(source) {
//     console.log(this.query)
//     // return source.replace('world', this.query.name)

//     // const code = source.replace('world', this.query.name)
//     // this.callback(null, code)

//     const callback = this.async()
//     setTimeout(() => {
//         const code = source.replace('world', this.query.name)
//         callback(null, code)
//     }, 1000)
// }

module.exports = function(source) {
    return source.replace('小帅哥', 'world')
}