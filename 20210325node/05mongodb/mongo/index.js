const express = require('express')
const app = new express()
const path = require('path')
const mongo = require('./models/db')

app.get('/', (req, res) => {
    res.sendFile(path.resolve('./index.html'))
})

app.get('/api/list', async(req, res) => {
    const { page, category, keyword } = req.query
    const condition = {}
    if (category) {
        condition.category = category
    }
    if (keyword) {
        condition.name = { $regex: new RegExp(keyword) } 
    }
    console.log(condition)
    try {
        const col = mongo.col('fruits')
        const total = await col.find(condition).count()
        const fruits = await col.find(condition).skip((page - 1) * 5).limit(5).toArray()
        res.json({
            ok: 1,
            data: {
                fruits,
                pagination: {
                    total,
                    page
                }
            }
        })
    } catch (error) {
        console.log(error)
    }
})

app.get('/api/category', async(req, res) => {
    const col = mongo.col('fruits')
    const data = await col.distinct('category')
    res.json({
        ok: 1,
        data
    })
})

app.listen(3000)