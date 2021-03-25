// import React from 'react';
// import ReactDOM from 'react-dom';
import React, { Component } from './kreact'
import ReactDOM from './kreact-dom'

function Comp(props) {
	return (
		// <h2>hi {props.name}</h2>
		React.createElement('h2', null, 'hi', props.name)
	)
}

class Comp2 extends Component {
	render() {
		return (
			// <div>comp2 {this.props.name}</div>
			React.createElement('div', null, this.props.name)
		)
	}
}

const foo = 'abc'
const users = [
	{name: 'tom'},
	{name: 'jeery'}
]
// const jsx = (
// 	<div id="demo">
// 		<span>hi</span>
// 		<Comp name="函数组件" />
//      <Comp2 name="类组件" />
// 	</div>
// )
const jsx = React.createElement('div', { id: 'demo', className: foo}, 
	React.createElement('span', null, 'hi'),
	React.createElement(Comp, {name: '函数组件'}),
	React.createElement(Comp2, {name: '类组件'}),
	users.map(user => {
		return (React.createElement('div', null, user.name))
	})
)

// React.createElement() => vdom
console.log(jsx)

ReactDOM.render(jsx, document.getElementById('root'));
