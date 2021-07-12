const path = require('path')
const CopyRightWebpackPlugin = require('./plugins/copyright-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
    },
    resolveLoader: {
        modules: ['node_modules', './loaders']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    // path.resolve(__dirname, './loaders/replaceLoader.js'),
                    'replaceLoader',
                    {
                        // loader: path.resolve(__dirname, './loaders/replaceLoaderAsync.js'),
                        loader: 'replaceLoaderAsync',
                        options: {
                            name: '小帅哥'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CopyRightWebpackPlugin({
            name: 'jxl'
        })
    ]
}