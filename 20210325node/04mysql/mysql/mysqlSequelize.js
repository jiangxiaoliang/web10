(async () => {
    const Sequelize = require('sequelize')
    // 建立连接
    const sequelize = new Sequelize('test', 'root', 'admin', {
        host: 'localhost',
        dialect: 'mysql'
    })
    // 定义模型
    const Fruit = sequelize.define('Fruit', {
        name: {
            type: Sequelize.STRING(20),
            allowNull: false,
            get() {
                const fname = this.getDataValue('name')
                const fprice = this.getDataValue('price')
                const fstock = this.getDataValue('stokc')
                return `${fname}(价格：￥${fprice} 库存：${fstock}kg)`;
            }
        },
        price: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        stock: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    }, {
        timestamps: false,
        getterMethods: {
            amount() {
                return this.getDataValue('stock') + 'kg'
            }
        },
        setterMethods: {
            amount(val) {
                const idx = val.indexOf('kg')
                const v = val.slice(0, idx)
                this.setDataValue('stock', v)
            }
        }
    })
    // 同步数据库，force: true则会删除已存在表
    let ret = await Fruit.sync({
        force: true
    })
    console.log(`sync: ${ret}`)
    ret = await Fruit.create({
        name: '香蕉',
        price: 3.5
    })
    console.log(`create: ${ret}`)
    ret = await Fruit.findAll()
    console.log(ret[0].amount)
    console.log(`findAll: ${JSON.stringify(ret)}`)
    Fruit.findAll().then(fruits => {
        fruits[0].amount = '150kg'
        fruits[0].save()
    })
})()