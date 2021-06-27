// console.log('123')

// webpack-dev-server
// import axios from 'axios'
// axios.get('/api/info').then(res => {
//     console.log(res)
// })

// css HMR
// import './css/index.css'
// var btn = document.createElement('button')
// btn.innerHTML = '新增'
// document.body.appendChild(btn)
// btn.onclick = function() {
//     var div = document.createElement('div')
//     div.innerHTML = 'item'
//     document.body.appendChild(div)
// }

// js HMR
// import counter from './counter'
// import number from './number'
// counter()
// number()
// if (module.hot) {
//     module.hot.accept('./number', function() {
//         document.body.removeChild(document.getElementById('number'))
//         number()
//     })
// }

// babel-loader
// import '@babel/polyfill'
// const arr = [new Promise(() => {}), new Promise(() => {})];
// arr.map(item => {
//     console.log(item);
// });

// babel-react
// import React, { Component } from 'react'
// import ReactDom from 'react-dom'
// class App extends Component {
//     render() {
//         return <div>hello babel react</div>
//     }
// }
// ReactDom.render(<App />, document.getElementById('app'))

// tree shaking
// import { add } from './expo'
// console.log(add(1, 2))

// code spliting 将第三方库和业务代码分割开
// import _ from 'lodash'
// console.log(_.join(['a', 'b', '***']))

// code spliting 推荐使用async 性能优化 提升代码覆盖率 预获取
document.addEventListener('click', () => {
    // const ele = document.createElement('div')
    // ele.innerHTML = 'webpack 5.X'
    // document.body.appendChild(ele)
    // 上面代码以异步方式导入
    import(/* webpackPrefetch: true */ './aysnc').then(({default: func}) => {
        func()
    })
})