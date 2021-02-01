import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getInfo } from '@/api/user'

const state = {
    token: getToken(),
    roles: []
    // 其他用户信息
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    }
}

const actions = {
    login({ commit }, userInfo) {
        // const { username } = userInfo
        // return new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //         if (username === 'admin' || username === 'jxl') {
        //             commit('SET_TOKEN', username)
        //             setToken(username)
        //             resolve()
        //         } else {
        //             reject('用户名或密码错')
        //         }
        //     }, 1000)
        // })
        return login(userInfo).then(res => {
            commit('SET_TOKEN', res.data)
            setToken(res.data)
        })
    },
    getInfo({ commit, state }) {
        // return new Promise((resolve) => {
        //     setTimeout(() => {
        //         const roles = state.token === 'admin' ? ['admin'] : ['editor']
        //         commit('SET_ROLES', roles)
        //         resolve({ roles })
        //     }, 1000)
        // })
        return getInfo(state.token).then(({data: roles}) => {
            commit('SET_ROLES', roles)
            return { roles }
        })
    },
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resolve()
        })
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}