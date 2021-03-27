const fs = require('fs')
const path = require('path')

module.exports = (dirPath = './public') => {
    console.log(`dirPath: ${dirPath}`)
    return async (ctx, next) => {
        console.log(`ctx.url: ${ctx.url}`)
        if (ctx.url.indexOf('/public') === 0) {
            // public开头 读取文件
            const url = path.resolve(__dirname, dirPath)
            const filePath = url + ctx.url.replace('/public', '')
            console.log(`url: ${url}, filePath: ${filePath}`)
            try {
                stats = fs.statSync(filePath)
                if (stats.isDirectory()) {
                    const dir = fs.readdirSync(filePath)
                    const ret = ['<div style="padding-left:20px">']
                    dir.forEach(filename => {
                        console.log(`filename: ${filename}`)
                        // 简单认为不带小数点的格式，就是文件夹，实际应该用statSync
                        if (filename.indexOf('.') > -1) {
                            ret.push(
                                `<p>
                                    <a style="color:black" href="${ctx.url}/${filename}">${filename}</a>
                                </p>`
                            )
                        } else {
                            ret.push(`<p><a href="${ctx.url}/${filename}">${filename}</a></p>`)
                        }
                    })
                    // console.log(`ret: ${ret}`)
                    ret.push('</div>')
                    ctx.body = ret.join('')
                } else {
                    const content = fs.readFileSync(filePath)
                    ctx.body = content
                }
            } catch (error) {
                ctx.body = '404, not found'
            }
        } else {
            await next()
        }
    }
}