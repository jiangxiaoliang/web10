const http = require('http')
// cookie原理
// http.createServer((req, res) => {
//     if (req.url === '/favicon.ico') {
//         res.end('')
//         return
//     }
//     // 观察cookie存在
//     console.log('cookie', req.headers.cookie)
//     // 设置cookie
//     res.setHeader('Set-Cookie', ['cookie1=abc', 'cookie2=cde;'])
//     res.end('hello cookie!')
// }).listen(3000)

// session原理
const session = {}
http.createServer((req, res) => {
    const sessionKey = 'sid'
    if (req.url === '/favicon.ico') {
        return
    }
    const cookie = req.headers.cookie
    if (cookie && cookie.indexOf(sessionKey) > -1) {
        res.end('come back')
        console.log('cookie', cookie)
        const pattern = new RegExp(`${sessionKey}=([^;]+);?\s*`)
        const sid = pattern.exec(cookie)[1]
        console.log('session:', sid, session, session[sid])
    } else {
        const sid = (Math.random() * 999999).toFixed()
        res.setHeader('Set-Cookie', `${sessionKey}=${sid}`)
        session[sid] = { name: 'laojiang' }
        res.end('hello cookie')
    }
}).listen(3000)