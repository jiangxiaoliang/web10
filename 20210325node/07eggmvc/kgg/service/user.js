const delay = (data, tick) => new Promise(resolve => {
    setTimeout(() => {
        resolve(data)
    }, tick)
})

module.exports = {
    getName() {
        return delay('jxl', 3000)
    },
    getAge() {
        return 20
    }
}