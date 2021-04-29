const Service = require('egg').Service

class UserService extends Service {
    /**
     * 创建用户
     * @param {*} payload 
     * @returns 
     */
    async create(payload) {
        const { ctx } = this
        payload.password = await ctx.genHash(payload.password)
        return ctx.model.User.create(payload)
    }

    async findByMobile(mobile) {
        return await this.ctx.model.User.findOne({
            mobile
        })
    }

    async find(id) {
        return await this.ctx.model.User.findOne({
            _id: id
        })
    }
}

module.exports = UserService