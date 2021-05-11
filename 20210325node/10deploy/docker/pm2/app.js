const Koa = require('koa')
const app = new Koa()

app.use(async(ctx, next) => {
    Math.random() > 0.9 ? a() : ''
    ctx.body = 'hello node'
})

app.listen(3000, () => {
    console.log('app started at 3000 port - pm2')
})