import { createApp } from './app'

export default context => {
    // 返回一个Promise
    // 确保路由或者组件准备就绪
    return new Promise((resolve, reject) => {
        // 创建Vue实例
        const { app, router } = createApp(context)
        // 跳转首屏地址
        router.push(context.url)
        // 路由就绪，完成Promise
        router.onReady(() => {
            resolve(app)
        }, reject)
    })
}