import * as Koa from 'koa'
import { get, post, middlewares } from '../utils/decors'
import model from '../model/user'

const user = [{ name: 'tom', age: 20 }, { name: 'jerry', age: 21 }]

// 异步校验接口
const api = {
    findByName(name) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (name === 'jxl') {
                    reject('用户名已存在')
                } else {
                    resolve('')
                }
            }, 1000)
        })
    }
}

@middlewares([
    async function guard(ctx: Koa.Context, next: () => Promise<any>) {
        console.log('guard')
        if (ctx.header.token) {
            await next()
        } else {
            throw '请登录'
        }
    }
])

export default class User {
    @get('/user')
    public async list(ctx: Koa.Context) {
        const users = await model.findAll({
            attributes: ['id', 'name']
        })
        ctx.body = {
            ok: 1,
            data: users
        }
    }
    @post('/user', {
        middlewares: [
            async function validation(ctx: Koa.Context, next: () => Promise<any>) {
                console.log('validation')
                const name = ctx.request.body.name
                if (!name) {
                    throw '请输入用户名'
                }
                try {
                    await api.findByName(name)
                    await next()
                } catch (error) {
                    throw error
                }
            }
        ]
    })
    public add(ctx: Koa.Context) {
        user.push(ctx.request.body)
        ctx.body = {
            ok: 1
        }
    }
}