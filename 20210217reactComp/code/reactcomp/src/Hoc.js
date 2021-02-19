import React, { Component } from 'react'

// 创建一个函数接收一个组件返回另外一个组件
// function withStage(C) {
//     const newComponent = props => {
//         return <C {...props} stage='react' />
//     }
//     return newComponent
// }

// function withLog(C) {
//     console.log(C.name + '加强了')
//     return props => {
//         return <C {...props} />
//     }
// }

// function Kai(props) {
//     return (
//         <div>
//             {props.stage} - {props.name}
//         </div>
//     )
// }

// export default withLog(withStage(withLog(Kai)))

// 装饰器写法
function withStage(C) {
    const newComponent = props => {
        return <C {...props} stage='vue' />
    }
    return newComponent
}
function withLog(C) {
    return props => {
        console.log(C.name + '加强了')
        return <C {...props} />
    }
}
@withLog
@withStage
@withLog
class Kai extends Component {
    render() {
        return (
            <div>
                {this.props.stage} - {this.props.name}
            </div>
        )
    }
}

export default Kai