const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const baseConfig = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js'
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
    ],
    optimization: {
        usedExports: true,
        splitChunks: {
            chunks: 'async'
        }
    }
}

module.exports = baseConfig