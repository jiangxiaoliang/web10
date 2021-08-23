const Koa = require('koa')
const app = new Koa()

const port = 3000

const config = require('./conf')
const { loadModel } = require('./framework/loader')
loadModel(config)(app)

const boydParser = require('koa-bodyparser')
app.use(boydParser())

const rest = require('./framework/router')
app.use(rest)

app.listen(port, () => {
    console.log(`app start at port: ${port}`)
})