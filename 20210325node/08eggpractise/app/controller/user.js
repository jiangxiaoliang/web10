const Controller = require('egg').Controller

/**
 * @Controller 用户管理
 */
class UserController extends Controller {
    constructor(ctx) {
        super(ctx)
    }

    /**
     * @summary 创建用户
     * @description 创建用户，记录账号/密码/类型
     * @router post /api/user
     * @request body createUserRequest *body
     * @response 200 baseResponse 创建成功
     */
    async create() {
        const { ctx, service } = this
        // abc()
        // ctx.body = 'use ctrl'
        // console.log('createUserRequest', ctx.rule.createUserRequest)
        ctx.validate(ctx.rule.createUserRequest)
        // const res = { abc: 123 }
        const payload = ctx.request.body || {}
        const res = service.user.create(payload)
        ctx.helper.success({ ctx, res })
    }
}

module.exports = UserController