import us from '@/server/user'

export default {
    state: {
        isLogin: !!window.localStorage.getItem('token')
    },
    mutations: {
        setLoginState(state, val) {
            state.isLogin = val
        }
    },
    actions: {
        login({commit}, userInfo) {
            return us.login(userInfo).then(({token}) => {
                if (token) {
                    window.localStorage.setItem('token', token)
                    commit('setLoginState', true)
                    return true
                }
                return false
            })
        },
        logout({commit}) {
            window.localStorage.removeItem('token')
            commit('setLoginState', false)
        }
    }
}