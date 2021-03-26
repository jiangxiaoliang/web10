const fs = require('fs')
const path = require('path')
// const data = fs.readFileSync('./index.js')
// console.log(data.toString())

fs.readFile(path.resolve(__dirname, './index.js'), (error, data) => {
    console.log(data.toString())
})