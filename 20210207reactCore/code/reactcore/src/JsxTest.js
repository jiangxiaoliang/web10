import React, { Component } from 'react'
import './jsxTest.css'
import logo from './logo.svg'

function formatName(user) {
    return user.firstname + ' ' + user.lastname
}

export default class JsxTest extends Component {
    render() {
        const name = 'jerry'
        const greet = <p>hello, react</p>
        return (
            <div>
                {/* 表达式：合法js表达式即可 */}
                <h1>{name}</h1>
                {/* 函数也是表达式 */}
                <p>{formatName({firstname: 'jiang', lastname: 'xiaoliang'})}</p>
                {/* jsx也是表达式 */}
                {greet}

                {/* 属性 */}
                <img src={logo} style={{width: '100px'}} className="img" alt='logo' />
            </div>
        )
    }
}