module.exports = {
    createUserRequest: {
        mobile: {
            type: 'string',
            required: true,
            description: '手机号',
            example: '13188888888',
            format: /^1[34578]\d{9}$/
        },
        password: {
            type: 'string',
            required: true,
            description: '密码',
            example: '123456'
        },
        realName: {
            type: 'string',
            required: true,
            description: '姓名',
            example: 'jxl'
        }
    }
}