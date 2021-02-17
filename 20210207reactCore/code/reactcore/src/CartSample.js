import React, { Component } from 'react';

function Cart(props) {
    return (
        <table>
            <tbody>
                {props.data.map(good => (
                    <tr key={good.id} onClick={() => props.onSelect(good.text)}>
                        <td>{good.text}</td>
                        <td>{good.count}</td>
                        <td>￥{good.count * good.price}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

class CartSample extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            name: '',
            goods: [
                { text: "百万年薪架构师", price: 100, id: 1 },
                { text: "web全栈架构师", price: 80, id: 2 },
                { text: "Python爬虫", price: 60, id: 3 }
            ],
            cart: []
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                title: 'react 购物车'
            })
        }, 1000)
    }
    handleChange = e => {
        this.setState({
            name: e.target.value
        })
    }
    addGood = ()=> {
        this.setState({
            goods: [...this.state.goods, { text: this.state.name, price: 88, id: this.state.goods.length + 1}]
        })
    }
    addCart(good) {
        const item = this.state.cart.find(g => g.text === good.text)
        if (item) {
            item.count += 1
            this.setState({
                cart: [...this.state.cart]
            })
        } else {
            this.setState({
                cart: [...this.state.cart, {
                    ...good,
                    count: 1
                }]
            })
        }
    }
    // 父子通讯
    onSelect1 = name => {
        console.log(name)
    }
    render() {
        return (
            <div>
                {this.state.title ? this.state.title : ''}
                <div>
                    <input type="text" value={this.state.name} onChange={e => this.handleChange(e)} />
                    <button onClick={() => this.addGood()}>添加</button>
                </div>
                <ul>
                    {
                        this.state.goods.map(good => (
                            <li key={good.text}>
                                {good.text}
                                <button onClick={() => this.addCart(good)}>加购</button>
                            </li>
                        ))
                    }
                </ul>

                {/* 购物车 */}
                <Cart data={this.state.cart} onSelect={this.onSelect1}></Cart>
            </div>
        );
    }
}

export default CartSample;
