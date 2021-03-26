const http = require('http')
const url = require('url')
const { EventEmitter } = require('events')

let routers = []
class Applicatoin {
    get(path, handler) {
        if (typeof path === 'string') {
            routers.push({
                path,
                method: 'get',
                handler
            })
        }
    }
    listen() {
        const server = http.createServer((req, res) => {
            const { pathname } = url.parse(req.url)
            for (let router of routers) {
                const { path, method, handler } = router
                if (pathname === path && req.method.toLowerCase() === method) {
                    return handler(req, res)
                }
            }
        })
        process.on('uncaughtException', err => {
            console.log('wwwww', err)
        })
        server.listen(...arguments)
    }
}

module.exports = function createApplication() {
    return new Applicatoin()
}