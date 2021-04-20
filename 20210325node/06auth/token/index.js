const Koa = require('koa')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const jwt = require('jsonwebtoken')
const jwtAuth = require('koa-jwt')
const app = new Koa()

const secret = 'some secret'
app.use(static(__dirname + '/'))
app.use(bodyParser())

router.post('/login', async (ctx) => {
    const { body } = ctx.request
    console.log('body', body)
    const userinfo = body.username
    ctx.body = {
        messsage: '登录成功',
        user: userinfo,
        token: jwt.sign({
            data: userinfo,
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
        }, secret)
    }
})
router.get('/getUser', jwtAuth({ secret }), async (ctx) => {
    // state为上个中间件的值
    console.log(ctx.state)
    ctx.body = {
        message: '获取数据',
        userinfo: ctx.state.user.data
    }
})

app.use(router.routes())
app.use(router.allowedMethods())
app.listen(3000)