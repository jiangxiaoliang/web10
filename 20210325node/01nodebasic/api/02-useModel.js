const os = require('os')
const cpuStat = require('cpu-stat')
const util = require('util')
const getCpu = util.promisify(cpuStat.usagePercent)
// const mem = (os.totalmem - os.freemem()) / os.totalmem() * 100
// console.log(`内存使用率${mem.toFixed(2)}%`)
// cpuStat.usagePercent((err, percent) => {
//     console.log(`CPU占用:${percent.toFixed(2)}%`)
// })
// getCpu().then(percent => {
//     console.log(`CPU占用:${percent.toFixed(2)}%`)
// })

const showStat = async () => {
    const mem = (os.totalmem - os.freemem()) / os.totalmem() * 100
    const percent = await getCpu()
    console.log(`内存使用率${mem.toFixed(2)}%`)
    console.log(`CPU占用:${percent.toFixed(2)}%`)
}

module.exports = {
    showStat
}