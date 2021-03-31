const http = require('http')
const fs = require('fs')

const app = http.createServer((req, res) => {
    const { url, method } = req
    // console.log(url, method)
    if (method === 'GET' && url === '/') {
        fs.readFile('./index.html', (err, data) => {
            res.setHeader('Content-Type', 'text/html')
            // console.log(data)
            res.end(data)
        })
    } else if (method === 'GET' && url === '/api/user') {
        // console.log(`cookie: ${req.headers.cookie}`)
        res.setHeader('Set-Cookie', 'cookie1=abc123')
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
        res.setHeader('Access-Control-Allow-Credentials', 'true')
        res.end(JSON.stringify([
            {
                name: 'tom'
            }
        ]))
    } else if (method === 'OPTIONS' && url === '/api/user') {
        res.setHeader('Access-Control-Allow-Credentials', 'true')
        res.writeHead(200, {
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Headers': 'X-Token, Content-Type',
            'Access-Control-Allow-Methods': 'PUT'
        })
        res.end()
    } else if (method === 'POST' && url === '/api/save') {
        let reqData = []
        let size = 0
        req.on('data', data => {
            console.log(`>>>req on: ${data}`)
            reqData.push(data)
            size += data.length
        })
        req.on('end', function() {
            console.log('end')
            const data = Buffer.concat(reqData, size)
            console.log(`data: ${size}, ${data}`)
            res.end(`fromData:${data.toString()}`)
        })
    }
})
// app.listen(3000)
module.exports = app