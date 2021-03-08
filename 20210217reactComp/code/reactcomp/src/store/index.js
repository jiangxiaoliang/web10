import { createStore, applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import fruitsReducer from './fruit.redux'
import user from './user.resux'
import createSagaMiddleware from 'redux-saga'
import mySaga from './sagas'

// 创建saga中间件并注册
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    combineReducers({
        fruit: fruitsReducer,
        user
    }), 
    applyMiddleware(logger, thunk, sagaMiddleware)
)
sagaMiddleware.run(mySaga)
export default store