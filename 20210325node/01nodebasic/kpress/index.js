// const express = require('express')
const express = require('./kpress')
const app = express()

app.get('/', (req, res) => {
    abc()
    res.end('hello world')
})
app.get('/user', (req, res) => {
    res.end(JSON.stringify([{ name: 'tom', age: 21}]))
})

// process.on('uncaughtException', err => {
//     console.log('qqqq', err)
// })

app.listen(3000, () => {
    console.log('server listen in 3000')
})