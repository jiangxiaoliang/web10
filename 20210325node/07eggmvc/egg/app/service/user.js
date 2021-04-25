'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async getAll() {
    // return { age: 20 };
    return await this.ctx.model.User.findAll()
  }
}

module.exports = UserService;
