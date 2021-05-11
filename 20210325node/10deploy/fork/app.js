const Koa = require('koa')
const app = new Koa()

app.use(async(ctx, next) => {
    Math.random() > 0.9 ? a() : 2
    await next()
    ctx.response.type = 'text/html'
    ctx.body = '<h1>hello, koa2!</h1>'
})

if (!module.parent) {
    console.log('process.argv:', process.argv)
    const port = process.argv.length > 2 ? process.argv[2] : 3000
    app.listen(port)
    console.log(`app started at port ${port}`)
} else {
    module.exports = app
}