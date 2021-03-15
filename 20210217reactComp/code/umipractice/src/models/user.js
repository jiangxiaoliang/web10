import axios from 'axios'
import {history} from 'umi'

const userinfo = JSON.parse(localStorage.getItem('userinfo')) || {
    token: '',
    role: '',
    username: '',
    balance: ''
}

function login(payload) {
    return axios.post('/api/login', payload).then(({ data }) => {
        return {
            code: data.code,
            userinfo: data.data
        }
    })
}

export default {
    namespace: 'user',
    state: userinfo,
    effects: {
        *login({payload}, { call, put }) {
            try {
                const { code, userinfo } = yield call(login, payload)
                if (code === 0) {
                    localStorage.setItem('userinfo', JSON.stringify(userinfo))
                    yield put({
                        type: 'init',
                        payload: userinfo
                    })
                    history.push('/')
                } else {

                }
            } catch(error) {
                console.log(error)
            }
        }
    },
    reducers: {
        init(state, action) {
            return action.payload
        }
    }
}