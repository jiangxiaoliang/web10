import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    cart: [],
  },
  getters: {
    loginState(state) {
      return state.isLogin ? '欢迎回来' : '游客'
    }
  },
  mutations: {
    login(state) {
      state.isLogin = true
    },
    addCart(state, good) {
      let ret = state.cart.find(item => item.id === good.id)
      if (ret) {
        ret.count += 1
      } else {
        state.cart.push({...good, count: 1, active: true})
      }
    }
  },
  actions: {
    requestLogin(context, payload) {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log(context, payload)
          context.commit('login')
          resolve(true)
        }, 2000)
      })
    }
  },
  modules: {
  }
})
