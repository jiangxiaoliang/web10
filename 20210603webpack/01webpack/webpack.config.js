const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode: 'development',
    // 入口配置文件 string | array | object
    // entry: './src/index.js',
    entry: {
        // main: './src/index.js',
        index: './src/index.js',
        list: './src/list.js'
    },
    output: {
        // 必须是绝对路径
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            // {
            //     test: /\.(png|jpe?g|gif)$/,
            //     use: {
            //         loader: 'file-loader',
            //         options: {
            //             name: '[name]_[hash].[ext]',
            //             outputPath: 'imgs/'
            //         }
            //     }
            // },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name]_[hash].[ext]',
                        outputPath: 'imgs/',
                        limit: 2048
                    }
                }
            },
            {
                test: /\.css$/,
                // use: ['style-loader', 'css-loader']
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        ident: 'postcss',
                        plugins: [require('autoprefixer')]
                    }
                }, 'sass-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin({
            template: 'index.html',
            title: 'hello',
            inject: 'body',
            filename: 'index.html',
            chunks: ['index']
        }),
        new htmlWebpackPlugin({
            template: 'list.html',
            filename: 'list.html',
            chunks: ['list']
        }),
    ]
}