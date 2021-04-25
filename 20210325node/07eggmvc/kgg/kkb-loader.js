const fs = require('fs')
const path = require('path')
const Router = require('koa-router')
const Sequelize = require('sequelize')
const schedule = require("node-schedule")

// 文件读取
function load(dir, cb) {
    // 获取绝对路径
    const url = path.resolve(__dirname, dir)
    // console.log(__dirname, dir, url)
    // 读取路径下的文件
    const files = fs.readdirSync(url)
    // console.log(files)
    // 遍历文件
    files.forEach(filename => {
        filename = filename.replace('.js', '')
        const file = require(url + '/' + filename)
        cb(filename, file)
    })
}

// 路由加载
function initRouter(app) {
    const router = new Router()
    load('routes', (filename, routes) => {
        // 处理index前缀的文件
        const prefix = filename === 'index' ? '' : `/${filename}`
        // 判断路由类型，若为函数需传递app进去
        routes = typeof routes === 'function' ? routes(app) : routes
        // 遍历routes并将路由添加到路由器
        Object.keys(routes).forEach(key => {
            const [method, path] = key.split(' ')
            console.log(`正在映射地址：${method.toLocaleUpperCase()} ${prefix}${path}`);
            // router[method](prefix + path, routes[key])
            router[method](prefix + path, async ctx => {
                app.ctx = ctx
                await routes[key](app)
            })
        })
    })
    return router
}

// 控制层加载
function initController() {
    const controllers = {}
    load('controller', (filename, controller) => {
        controllers[filename] = controller
    })
    return controllers
}

// 服务层加载
function initService() {
    const services = {}
    load('service', (filename,service) => {
        services[filename] = service
    })
    return services
}

function laodConfig(app) {
    load('config', (filename, conf) => {
        if (conf.db) {
            app.$db = new Sequelize(conf.db)
            // 加载模型
            app.$model = {}
            load('model', (filename, { schema, options }) => {
                app.$model[filename] = app.$db.define(filename, schema, options)
            })
            app.$db.sync()
        }
        if (conf.middlewares) {
            conf.middlewares.forEach(mid => {
                const midPath = path.resolve(__dirname, 'middleware', mid)
                app.$app.use(require(midPath))
            })
        }
    })
}

function initSchedule() {
    load("schedule", (filename, scheduleConfig) => {
        schedule.scheduleJob(scheduleConfig.interval, scheduleConfig.handler);
    });
}

module.exports = {
    initRouter,
    initController,
    initService,
    laodConfig,
    initSchedule
}