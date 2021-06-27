const webpack = require('webpack')
const { merge } = require("webpack-merge");
const baseConfig = require('./webpack.base')

const devConfig = {
    // devtool:"cheap-module-eval-source-map",// 开发环境配置
    // devtool:"cheap-module-source-map", // 线上生产成配置
    devtool: 'eval-cheap-module-source-map',
    mode: 'development',
    devServer: {
        contentBase: './dist', //资源文件目录
        open: true, // 是否自动打开浏览器
        port: 8081, // 端口
        hot: true, // 开启HMR
        hotOnly: true, // 即便便HMR不不⽣生效，浏览器器也不不⾃自动刷新，就开启hotOnly
        proxy: {
            '/api': {
                target: 'http://localhost:9092'
            }
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}

module.exports = merge(baseConfig, devConfig)