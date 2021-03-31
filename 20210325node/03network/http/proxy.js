// const express = require('express')
// const app = express()
// app.use(express.static(__dirname + '/'))
// // app.listen(4000)
// module.exports = app


// proxy代理模式
const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const app = express()
app.use(express.static(__dirname + '/'))
app.use('/api', createProxyMiddleware({
    target: 'http://localhost:4000',
    changeOrign: false
}))
module.exports = app