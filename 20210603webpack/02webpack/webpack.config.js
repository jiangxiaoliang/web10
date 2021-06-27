const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    // devtool:"cheap-module-eval-source-map",// 开发环境配置
    // devtool:"cheap-module-source-map", // 线上生产成配置
    devtool: 'eval-cheap-module-source-map',
    mode: 'development',
    // mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
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
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, './src'),
                loader: 'babel-loader',
                // options: {
                //     "presets": [["@babel/preset-env", {
                //         targets: {
                //             chrome: '67'
                //         },
                //         useBuiltIns: 'usage', // 按需注入
                //         corejs: 2
                //     }]]
                // }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html',
            title: 'webpack day2',
            filename: 'index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    optimization: {
        usedExports: true,
        splitChunks: { // 自动代码分割
            chunks: 'all' // 默认是⽀支持异步，我们使⽤用all
        }
    }
}