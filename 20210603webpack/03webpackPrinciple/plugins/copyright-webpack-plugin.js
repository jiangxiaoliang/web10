class CopyRightWebpackPlugin {
    constructor(options) {
        // console.log(options)
    }
    // compiler:webpack实例
    apply(compiler) {
        compiler.hooks.emit.tapAsync("CopyRightWebpackPlugin", (compilation, cb) => {
            compilation.assets["copyright.txt"] = {
                source: function() {
                    return "hello copy"
                },
                size: function() {
                    return 1024
                }
            }
            cb()
        })

        // 同步写法
        compiler.hooks.compile.tap("CopyRightWebpackPlugin", compilation => {
            console.log('start')
        })
    }
}

module.exports = CopyRightWebpackPlugin