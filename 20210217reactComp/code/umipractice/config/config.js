export default {
    antd: {},
    dva: {},
    routes: [
        { path: '/login', component: './login' },
        {
            path: '/',
            component: '../layouts',
            routes: [
                // { path: '/', component: './index' },
                { path: '/', component: './goods/index' },
                { path: '/about', component: './about', wrappers: [
                    './routes/PrivateRoute.js' // 相对根目录
                ]},
                {
                    path: '/users',
                    component: './users/_layout',
                    routes: [
                        { path: '/users/', component: './users/index' },
                        { path: '/users/:id', component: './users/[id]'}
                    ]
                },
                { component: './404' }
            ]
        }
    ]
}