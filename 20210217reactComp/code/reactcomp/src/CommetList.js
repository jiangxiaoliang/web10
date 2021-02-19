import React, { Component, PureComponent } from 'react'

// 容器组件
export default class CommetList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            commets: []
        }
    }
    componentDidMount() {
        setInterval(() => {
            this.setState({
                commets: [
                    { body: 'react is very good', author: 'facebook'},
                    { body: 'vue is very good', author: 'youyuxi'}
                ]
            })
        }, 1000)
    }
    render() {
        return (
            <div>
                {
                    this.state.commets.map((c, i) => (
                        <Comment key={i} {...c} />
                    ))
                }
            </div>
        )
    }
}

// 展示组件
// function Comment(props) {
//     console.log('render comment')
//     return (
//         <div>
//             <p>{props.data.body}</p>
//             <p>{props.data.author}</p>
//         </div>
//     )
// }
// class Comment extends PureComponent {
//     // shouldComponentUpdate(props) {
//     //     if (props.data.body === this.props.data.body &&
//     //         props.data.author === this.props.data.author) {
//     //             return false
//     //         }
//     //     return true
//     // }
//     render() {
//         console.log('render comment')
//         const {body, author} = this.props
//         return (
//             <div>
//                 <p>{body}</p>
//                 <p>{author}</p>
//             </div>
//         )
//     }
// }
const Comment = React.memo(function({body, author}) {
    console.log('render comment')
    return (
        <div>
            <p>{body}</p>
            <p>{author}</p>
        </div>
    )
})

