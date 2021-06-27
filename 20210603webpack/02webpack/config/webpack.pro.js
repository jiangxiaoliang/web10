const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')

const proConfig = {
    // devtool:"cheap-module-eval-source-map",// 开发环境配置
    // devtool:"cheap-module-source-map", // 线上生产成配置
    devtool: 'eval-cheap-module-source-map',
    mode: 'production'
}

module.exports = merge(baseConfig, proConfig)