// koa中使用session
const Koa = require('koa')
const session = require('koa-session')
const app = new Koa()

// 签名keys keys作用用来对cookie进行签名
app.keys = ['some secret']
// 配置项
const SESS_CONFIG = {
    key: 'kkb:sess', // cookie键名
    maxAge: 24 * 60 * 60 * 1000, // 过期时间
    httpOnly: true, // 仅服务器修改
    signed: true, // 签名cookie
}
// 注册
app.use(session(SESS_CONFIG, app))
// 测试
app.use(ctx => {
    if (ctx.path === '/favicon.ico') return
    let n = ctx.session.n || 0
    ctx.session.n = ++n
    ctx.body = `第${n}次访问`
})
app.listen(3000)