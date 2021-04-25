const Koa = require('koa')
const { initRouter, initController, initService, laodConfig, initSchedule } = require('./kkb-loader')

class kkb {
    constructor(conf) {
        this.$app = new Koa()
        laodConfig(this)
        this.$service = initService()
        this.$ctrl = initController()
        this.$router = initRouter(this)
        this.$app.use(this.$router.routes())
        initSchedule()
    }
    start(port) {
        this.$app.listen(port, () => {
            console.log(`Service start in ${port}`)
        })
    }
}

module.exports = kkb