import axios from 'axios'

export default function(vm) {
    axios.interceptors.request.use(config => {
        const token = window.localStorage.getItem('token')
        if (token) {
            // config.headers.token = token
            config.headers.Authorization = 'Bearer ' + token
        }
        return config
    })

    axios.interceptors.response.use(null, err => {
        if (err.response.status === 401) {
            // 清空
            vm.$store.dispatch('logout')
            // 跳转
            vm.$router.push('/login')
        }
        return Promise.reject(err)
    })
}