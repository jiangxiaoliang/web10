import React, { useState, useEffect, useReducer, useContext } from 'react'

function FruitList(props) {
    return props.fruits.map(fruit => (
        <li key={fruit} onClick={() => props.setFruit(fruit)}>
            {fruit}
        </li>
    ))
}

function FruitAdd(props) {
    const [pname, setPname] = useState('')
    // 获取上下文
    const {dispatch} = useContext(Context)
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
}

// 状态移动至全局
function fruitsReducer(state, action) {
    switch(action.type) {
        case 'init':
            return action.payload
        case 'add':
            return [...state, action.payload]
        default:
            return state
    }
}

const Context = React.createContext()

export default function HookTest() {
    // useState参数是状态初始值
    // 返回一个数组，第一个元素是状态变量，第二个元素是状态变更函数
    const [fruit, setFruit] = useState('')
    // const [fruits, setFruits] = useState(['草莓', '香蕉'])
    // const [fruits, setFruits] = useState([])
    const [fruits, dispatch] = useReducer(fruitsReducer, [])
    // 使用useEffect操作副作用
    // 请务必设置依赖选项，如果没有则设置空数组表示执行一次
    useEffect(() => {
        console.log('get fruit')
        setTimeout(() => {
            // setFruits(['草莓', '香蕉'])
            dispatch({
                type: 'init',
                payload: ['草莓', '香蕉']
            })
        }, 1000)
    }, [])
    useEffect(() => {
        document.title = fruit
    }, [fruit])
    useEffect(() => {
        const timer = setInterval(() => {
            console.log('应用启动了')
        }, 1000)
        // 返回清楚函数
        return () => {
            clearInterval(timer)
        }
    }, [])
    return (
        <Context.Provider value={{dispatch}}>
           <div>
                <p>{fruit === '' ? '请选择喜爱的水果：' : `你喜爱的水果是${fruit}`}</p>
                {/* <FruitAdd onAddFruit={pname => setFruits([...fruits, pname])} /> */}
                {/* <FruitAdd onAddFruit={pname => dispatch({type: 'add', payload: pname})} /> */}
                <FruitAdd />
                <FruitList fruits={fruits} setFruit={setFruit} />
            </div> 
        </Context.Provider>
        
    )
}
