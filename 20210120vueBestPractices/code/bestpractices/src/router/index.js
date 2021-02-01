import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout' // 布局页

Vue.use(VueRouter)

// 通用页面，不需要权限的
export const constRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login'),
    hidden: true // 导航菜单忽略该项
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    meta: {title: '首页', icon:'qq'},
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
        meta: {
          title: 'Home', // 导航菜单项标题
          icon: 'qq' // 导航菜单项图标
        }
      },
      {
        path: 'mua',
        name: 'mua',
        component: () => import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
        meta: {
          title: '啵一个', // 导航菜单项标题
          icon: 'wx' // 导航菜单项图标
        }
      }
    ]
  }
]

export const asyncRoutes = [
  {
    path: '/about',
    component: Layout,
    redirect: '/about/index',
    meta: {title: '我的', icon:'qq'},
    children: [
      {
        path: 'index',
        name: 'about',
        component: () => import(/* webpackChunkName: "home" */ "@/views/About.vue"),
        meta: {
          title: '用户中心',
          icon: 'wx',
          roles: ['admin']
        }
      },
      {
        path: 'bla',
        name: 'bla',
        component: () => import(/* webpackChunkName: "home" */ "@/views/About.vue"),
        meta: {
          title: '关于我们',
          icon: 'wx',
          roles: ['editor']
        }
      }
    ]
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constRoutes
})

export default router
