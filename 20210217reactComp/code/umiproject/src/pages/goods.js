import React, { Component } from 'react'
import { Button, Card } from 'antd'
import { connect } from 'dva'

@connect(
    state => ({
        goodsList: state.goods
    }),
    {
        addGood: title => ({
            type: 'goods/addGood',
            payload: { title }
        })
    }
)
class Goods extends Component {
    render() {
        return (
            <div>
                <div>
                    {
                        this.props.goodsList.map(good => {
                            return (
                                <Card key={good.title}>
                                    <div>{good.title}</div>
                                </Card>
                            )
                        })
                    }
                    <div>
                        <Button
                            onClick={() => 
                                this.props.addGood('商品' + new Date().getTime())
                            }>添加商品</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Goods