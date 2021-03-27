const Koa = require('koa')
const app = new Koa()

// app.use((ctx, next) => {
//     ctx.body = [{
//         name: 'tom'
//     }]
//     next()
//     console.log(ctx.body)
//     // ctx.body.push({
//     //     name: 'abc'
//     // })
// })

// let router = {}
// router['/html'] = ctx => {
//     ctx.type = 'text/html;charset=utf-8'
//     ctx.body = `<b>名字:${ctx.body[0].name}</b>`
// }
// app.use((ctx, next) => {
//     // ctx.body.push({
//     //     name: 'jerry'
//     // })
//     // if (ctx.url === '/html') {
//     //     ctx.type = 'text/html;charset=utf-8'
//     //     ctx.body = `<b>名字:${ctx.body[0].name}</b>`
//     // }
//     router[ctx.url](ctx)
// })

const static = require('koa-static')
const router = require('koa-router')()
app.use(static(__dirname + '/'))
router.get('/string', async(ctx, next) => {
    ctx.body = 'string'
})
router.get('/json', async(ctx, next) => {
    ctx.body = {
        name: 'jerry'
    }
})
app.use(router.routes())
app.listen(3000)