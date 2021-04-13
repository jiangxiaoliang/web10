const mongodb = require('./models/db')

mongodb.once('connect', async () => {
    const col = mongodb.col('fruits')
    await col.deleteMany()
    const data = new Array(100).fill().map((v, i) => {
        return {
            name: i,
            price: i,
            category: Math.random() > .5 ? '蔬菜' : '水果'
        }
    })
    await col.insertMany(data)
    console.log('数据插入成功')
})