const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
    // console.log(getPrototypeChain(res))
    // res.end('hello world')
    const { url, method, headers } = req
    if (url === '/' && method === 'GET') {
        fs.readFile('index.html', (err, data) => {
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/html')
            res.end(data)
        })
    } else if (url === '/user' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify([{
            name: 'abc'
        }]))
    } else if (method === 'GET' && headers.accept.indexOf('image/*') !== -1) {
        fs.createReadStream('.' + url).pipe(res)
    }
})

server.listen(3000)

function getPrototypeChain(obj) {
    const proto = []
    while(obj = Object.getPrototypeOf(obj)) {
        proto.push(obj)
    }
    proto.push(null)
    return proto
}