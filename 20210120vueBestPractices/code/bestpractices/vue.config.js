// commonjs nodejs
const path = require('path')
const bodyParser = require('body-parser')
const port = 7070
const title = 'vue的最佳实践'

// resolve定义一个绝对路径获取函数
function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: '/best-practice',
    devServer: {
        port: port,
        proxy: {
            // 代理 /dev-api/user/login 到 http://127.0.0.1:3000/user/login
            [process.env.VUE_APP_BASE_API]: {
                target: 'http://localhost:3000/',
                changeOrigin: true, // 要不要变更origin头
                pathRewrite: { // 地址重写：http://127.0.0.1:3000/user/login
                    ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            }
        },
        // before: app => {
        //     app.use(bodyParser.json())
        //     app.use(
        //         bodyParser.urlencoded({
        //             extended:  true
        //         })
        //     )
        //     app.post('/dev-api/user/login', (req, res) => {
        //         const { username } = req.body
        //         if (username === 'admin' || username === 'jxl') {
        //             res.json({
        //                 code: 1,
        //                 data: username
        //             })
        //         } else {
        //             res.json({
        //                 code: 10204,
        //                 message: '用户名或者密码错'
        //             })
        //         }
        //     })
        //     app.get('/dev-api/user/info', (req, res) => {
        //         const roles = req.headers['x-token'] === 'admin' ? ['admin'] : ['editor']
        //         res.json({
        //             code: 1,
        //             data: roles
        //         })
        //     })
        // }
    },
    configureWebpack: {
        // 向index.html注入标题
        name: title
    },
    chainWebpack(config) {
        // 配置svg规则排除icons目录中svg文件处理
        config.module.rule('svg')
            .exclude.add(resolve('src/icons'))
            .end();
        // 新增icons规则，设置svg-sprite-loader处理icons目录中的svg
        config.module.rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({ symbolId: 'icon-[name]' }) // 使用图标名称
            .end();
    }
}