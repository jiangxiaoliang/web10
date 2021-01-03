export default function({ $axios, store }) {
    // 利用$axios模块帮助方法setToken设置全局请求头
    // 此处省略token截取逻辑,cookie最好不要使用token关键字
    // $axios.setToken(document.cookie, 'Bearer')
    $axios.onRequest(config => {
        if (store.state.user.token) {
            config.headers.Authorization = 'Bearer ' + store.state.user.token
        }
        return config
    })
}