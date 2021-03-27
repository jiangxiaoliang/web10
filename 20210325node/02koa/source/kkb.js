const http = require('http')
const context = require('./context')
const request = require('./request')
const response = require('./response')

class KKB {
    constructor() {
        this.middlewares = []
    }
    use(callback) {
        // this.callback = callback
        // 将中间件添加到数组里
        this.middlewares.push(callback)
    }
    listen(...args) {
        const server = http.createServer(async (req, res) => {
            // this.callback(req, res)
            let ctx = this.createContext(req, res)
            // this.callback(ctx)
            // 中间件合成
            let fn = this.compose(this.middlewares)
            // 执行合成函数并传入上下文
            await fn(ctx)
            res.end(ctx.body)
        })
        server.listen(...args)
    }
    createContext(req, res) {
        const ctx = Object.create(context)
        ctx.request = Object.create(request)
        ctx.response = Object.create(response)

        ctx.req = ctx.request.req = req
        ctx.res = ctx.response.res = res
        return ctx
    }
    compose(middlewares) {
        return function(ctx) {
            return dispatch(0)
            function dispatch(i) {
                let fn = middlewares[i]
                if (!fn) {
                    return Promise.resolve()
                }
                return Promise.resolve(
                    fn(ctx, function next() {
                        return dispatch(i + 1)
                    })
                )
            }
        }
    }
}

module.exports = KKB