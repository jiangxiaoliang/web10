import { createStore, applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import fruitsReducer from './fruit.redux'
import user from './user.resux'

const store = createStore(
    combineReducers({
        fruit: fruitsReducer,
        user
    }), 
    applyMiddleware(logger, thunk)
)
export default store