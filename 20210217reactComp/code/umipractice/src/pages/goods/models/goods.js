import axios from 'axios'

function getGoods() {
    return axios.get('/api/goods').then(({ data }) => {
        const courseData = data.data
        return {
            courses: courseData.data,
            tags: courseData.tags
        }
    })
}

export default {
    namespace: 'goods', // model的命名空间，区分多个model
    state: {
        courses: {},
        tags: []
    }, // 初始状态
    effects: { // 异步操作
        *getList(action, { call, put }) {
            const payload = yield call(getGoods)
            yield put({
                type: 'initGoods',
                payload
            })
        }
    },
    reducers: { // 状态更新
        initGoods(state, action) {
            return action.payload
        }
    }
}