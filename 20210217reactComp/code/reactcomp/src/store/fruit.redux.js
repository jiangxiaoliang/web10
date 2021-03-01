export const init = (payload) => ({
    type: 'init',
    payload
})
export const loadingStart = () => ({
    type: 'loading_start'
})
export const loadingEnd = () => ({
    type: 'loading_end'
})

export const asyncFetch = (payload) => {
    return dispatch => {
        dispatch({ type: 'loading_start' })
        setTimeout(() => {
            dispatch({
                type: 'init',
                payload
            })
            dispatch({ type: 'loading_end' })
        }, 1000)
    }
}

export default function fruitsReducer(state = {
    list: [],
    loading: false
}, action) {
    switch(action.type) {
        case 'init':
            return { ...state, list: action.payload }
        case 'add':
            return { ...state, list: [...state.list, action.payload] }
        case 'loading_start':
            return { ...state, loading: true }
        case 'loading_end':
            return { ...state, loading: false }
        default:
            return state
    }
}