import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url基础地址，解决不同数据源url变化问题
    // withCredentials: true, // 跨域时若要发送cookies需设置该选项
    timeout: 5000 // 超时
})

// 请求拦截
service.interceptors.request.use(config => {
    // do something
    // 把令牌添加到请求头中
    if (store.getters.token) {
        config.headers['X-Token'] = getToken()
    }
    return config
}, error => {
    // 请求错误预处理
    return Promise.reject(error)
})

// 响应拦截
service.interceptors.response.use(response => {
    // 通过自定义code判定响应状态，也可以通过HTTP状态码判定
    const res = response.data
    if (res.code !== 1) {
        Message({
            message: res.message || 'Error',
            type: 'error',
            duration: 3 * 1000
        })
        // 假设：10008-非法令牌; 10012-其他客户端已登录; 10014-令牌过期
        if (res.code === 10008 || res.code === 10012 || res.code === 10014) {
            // 重新登陆
            MessageBox.confirm(
                '登录状态异常，请重新登陆',
                '确认登录信息',
                {
                    confirmButtonText: '重新登陆',
                    cancelButtonText: '取消',
                    type: 'warning'
                }
            ).then(() => {
                store.dispatch('user/resetToken').then(() => {
                    location.reload()
                })
            })
        }
        return Promise.reject(new Error(res.message || 'Error'))
    } else {
        return res
    }
}, error => {
    Message({
        message: error.message,
        type: 'error',
        duration: 3* 1000
    })
    return Promise.reject(error)
})

export default service