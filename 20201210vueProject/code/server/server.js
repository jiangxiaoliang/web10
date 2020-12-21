const Koa = require('koa')
const Router = require('koa-router')
const jwt = require('jsonwebtoken') // 令牌签发
const jwtAuth = require('koa-jwt') // 令牌校验

const secret = "it's a secret"

const app = new Koa()
const router = new Router()

router.get('/api/login', async ctx => {
    const {username, password} = ctx.query
    console.log(username, password)
    if (username === 'jxl' && password === '123') {
        const token = jwt.sign({
            data: {
                name: username
            },
            exp: Date.now() + 60 * 60
        }, secret)
        ctx.body = {
            code: 1,
            token
        }
    } else {
        ctx.status = 401
        ctx.body = {
            code: 0,
            mes: '用户名或者密码错'
        }
    }
})

router.get('/api/userInfo', jwtAuth({secret}) , async ctx => {
    ctx.body = {
        code: 1,
        data: {
            name: 'jerry'
        }
    }
})

app.use(router.routes())
app.listen(3000)