import React, { useState, useEffect, useReducer, useContext } from 'react'
import { connect } from 'react-redux'
import { init, loadingStart, loadingEnd, asyncFetch } from './store/fruit.redux'
import { BrowserRouter, Link, Route, Redirect, Switch } from 'react-router-dom'
import {login} from './store/user.resux'

function FruitList(props) {
    return (
        <div>
            <ul>
                {
                    props.fruits.map(fruit => (
                        <li key={fruit} onClick={() => props.setFruit(fruit)}>
                        <Link to={`/list/detail/${fruit}`}> {fruit}</Link>
                        </li>
                    ))
                }
            </ul>
            {/* 路由嵌套 */}
            <Route path='/list/detail/:fruit' component={Detail} />
        </div>
    )
}

const FruitAdd = connect()(function ({dispatch}) {
    const [pname, setPname] = useState('')
    // 获取上下文
    const onAddFruit = (e) => {
        if (e.key === 'Enter') {
            // props.onAddFruit(pname)
            dispatch({
                type: 'add',
                payload: pname
            })
            setPname('')
        }
    }
    return (
        <input 
            type='text'
            value={pname}
            onChange={e => setPname(e.target.value)}
            onKeyDown={onAddFruit}
        />
    )
})

function Detail({ match, history, location }) {
    console.log(match, history, location)
    return (
        <div>
            <h3>{match.params.fruit}的详情</h3>
            <p>....</p>
            <button onClick={history.goBack}>返回</button>
        </div>
    )
}

const PrivateRoute = connect(state => ({
    isLogin: state.user.isLogin
}))(function({ component: Component, isLogin, ...rest }) {
    // 结构props为component和rest
    // rest为传递给Route的属性
    return (
        <Route
            {...rest}
            render={
                props => isLogin ? (<Component {...props} />) : (
                    <Redirect to={{
                        pathname: '/login',
                        state: {redirect: props.location.pathname} // 重定向地址
                    }}
                    />
                )
            } />
    )
})

const Login = connect(state => ({
    isLogin: state.user.isLogin
}), {login})(function({ location, isLogin, login }) {
    console.log('dafa')
    const redirect = location.state.redirect || ''
    if (isLogin) return <Redirect to={redirect} />
    return (
        <div>
            <p>用户登录</p>
            <hr />
            <button onClick={login}>登录</button>
        </div>
    )
})


const mapStateToProps = state => ({
    fruits: state.fruit.list,
    loading: state.fruit.loading
})
const mapDispatchToProps = {
    init,
    loadingStart,
    loadingEnd,
    asyncFetch
}

function HookTest({fruits, loading, asyncFetch}) {
    // useState参数是状态初始值
    // 返回一个数组，第一个元素是状态变量，第二个元素是状态变更函数
    const [fruit, setFruit] = useState('')

    // 使用useEffect操作副作用
    // 请务必设置依赖选项，如果没有则设置空数组表示执行一次
    useEffect(() => {
        console.log('get fruit')
        // dispatch({ type: 'loading_start' })
        // loadingStart()
        // setTimeout(() => {
        //     // setFruits(['草莓', '香蕉'])
        //     // dispatch({
        //     //     type: 'init',
        //     //     payload: ['草莓', '香蕉']
        //     // })
        //     init(['草莓', '香蕉'])
        //     // dispatch({ type: 'loading_end' })
        //     loadingEnd()
        // }, 1000)
        asyncFetch(['草莓', '香蕉'])
        // dispatch({
        //     type: 'init',
        //     payload: asyncFetch(['草莓', '香蕉'])
        // })
    }, [])
    useEffect(() => {
        document.title = fruit
    }, [fruit])
    return (
        <BrowserRouter>
            {/* <p>{fruit === '' ? '请选择喜爱的水果：' : `你喜爱的水果是${fruit}`}</p> */}
            {/* <FruitAdd onAddFruit={pname => setFruits([...fruits, pname])} /> */}
            {/* <FruitAdd onAddFruit={pname => dispatch({type: 'add', payload: pname})} /> */}
            {/* <FruitAdd />
            {
                loading ? (
                    <div>数据加载中....</div>
                ) : (
                    <FruitList fruits={fruits} setFruit={setFruit} />
                )
            } */}
            
            <nav>
                <Link to="/list">水果列表</Link>|
                <Link to="/add">添加水果</Link>
            </nav>
            <Switch>
                <Route path="/list" render={() => (
                    loading ? (
                        <div>数据加载中....</div>
                    ) : (
                        <FruitList fruits={fruits} setFruit={setFruit} />
                    )
                )} />
                {/* <Route path='/add' component={FruitAdd} /> */}
                <PrivateRoute path='/add' component={FruitAdd} />
                <Route path='/login' component={Login} />
                {/* <Route path='/detail/:fruit' component={Detail} /> */}
                <Route component={() => <h3>页面不存在</h3>} />  
            </Switch>
            
        </BrowserRouter>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HookTest)
