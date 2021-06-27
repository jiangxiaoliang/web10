const express = require('express')
const app = express()

app.get('/api/info', (req, res) => {
    res.json({
        name: 'jxl test',
        age: 18,
        msg: '跨域测试'
    })
})

app.listen('9092')