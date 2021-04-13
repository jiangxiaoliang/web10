const log = (text, json) => {
    console.log(text, JSON.stringify(json, '', '\t'))
}
setTimeout(async () => {
    const { MongoClient: MongoDB } = require('mongodb')
    const client = new MongoDB('mongodb://localhost:27017', {
        useNewUrlParser: true
    })
    // 创建连接
    await client.connect()
    console.log('连接成功')
    // 获取数据库
    const db = client.db('test')
    // 获取集合
    const fruitsColl = db.collection('fruits')
    // 插入文档，返回Promise<CommandResult>
    let r = await fruitsColl.insertOne({
        name: '芒果',
        price: 20.2
    })
    log('插入成功', r)
    // 查询文档
    r = await fruitsColl.findOne()
    log('查询结果', r)
    // 更新文档
    r = await fruitsColl.updateOne({
        name: '芒果'
    }, {
        $set: {
            name: '苹果'
        }
    })
    log('更新成功', r)
    // 删除文档
    r = await fruitsColl.deleteOne({
        name: '苹果'
    })
    log('删除成功', r)
    client.close()
})