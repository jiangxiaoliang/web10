// module.exports = {
//     index: async ctx => {
//         ctx.body = '首页 ctrl'
//     },
//     detail: async ctx => {
//         ctx.body = '首页详情 ctrl'
//     }
// }

module.exports = {
    index: async app => {
        // const name = await app.$service.user.getName()
        // app.ctx.body = '首页 ctrl' + name

        // 使用模型
        app.ctx.body = await app.$model.user.findAll()
    },
    detail: async app => {
        app.ctx.body = '首页详情 ctrl'
    }
}