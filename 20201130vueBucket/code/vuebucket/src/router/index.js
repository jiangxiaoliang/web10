import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import List from '../views/List.vue'
import Detail from '../views/Detail.vue'
import store from '../store/index'
import Cart from '../views/Cart.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '',
        name: 'list',
        component: List
      },
      {
        path: '/detail/:id',
        name: 'detail',
        component: Detail,
        props: true
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.state.isLogin) {
        next({
          name: 'login',
          query: {
            redirect: to.path
          }
        })
      } else {
        next()
      }
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.path === '/about' && !window.isLogin) {
//     // next('/login?redirect' + to.path)
//     next({
//       name: 'login',
//       query: {
//         redirect: to.path
//       }
//     })
//   } else {
//     next()
//   }
// })

export default router
