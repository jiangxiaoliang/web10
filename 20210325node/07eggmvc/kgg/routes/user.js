// module.exports = {
//     'get /': async ctx => {
//         ctx.body = '用户首页'
//     },
//     'get /info': async ctx => {
//         ctx.body = '用户详情页'
//     }
// }


module.exports = {
    'get /': async app => {
        const name = await app.$service.user.getName()
        app.ctx.body = '用户首页' + name
    },
    'get /info': async app => {
        app.ctx.body = '用户详情页' + '年纪：' + app.$service.user.getAge()
    }
}