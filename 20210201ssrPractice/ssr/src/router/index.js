import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/Index'
import Detail from '@/components/Detail'

Vue.use(Router)

// 导出应是Router实例工厂函数
// 每个用户服务器都要创建一个实例会导致资源消耗比较大
export function createRouter() {
    return new Router({
        mode: 'history',
        routes: [
            {
                path: '/',
                component: Index
            },
            {
                path: '/detail',
                component: Detail
            }
        ]
    })
}