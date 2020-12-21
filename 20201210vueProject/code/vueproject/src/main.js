import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import store from './store'
import router from './router'
import intercepotr from './interceptor'

import {createAPI} from 'cube-ui'
import create from '@/utils/create'
import CartAnim from '@/components/CartAnim'

// 注册全局组件, $createCartAnim
createAPI(Vue, CartAnim, ['transitionend'])
Vue.prototype.$create = create

Vue.config.productionTip = false

const app = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

intercepotr(app)
