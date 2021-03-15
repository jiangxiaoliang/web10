import React, { Component } from 'react'
import { connect } from 'dva'
import { TagSelect } from 'ant-design-pro'
import { Card, Row, Col, Skeleton, Icon } from "antd";

class Goods extends Component {
    constructor(props) {
        super(props)
        this.state = {
            displayCourses: new Array(8).fill({}) // 填充数组用于骨架屏展示
        }
    }
    componentDidMount() {
        this.props.getList()
    }
    componentWillReceiveProps(props) {
        if (props.tags.length > 0) {
          this.tagSelectChange(props.tags, props.courses);
        }
    }
    tagSelectChange = (tags, courses = this.props.courses) => {
        const displayCourses = tags.flatMap(tag => courses[tag])
        this.setState({
            displayCourses
        })
    }
    addCart = (e, item) => {
        e.stopPropagation();
        this.props.addCart(item)
    }
    render() {
        if (this.props.loading.models.goods) {
            return <div>加载中....</div>
        }
        return (
            <div>
                {/* {this.props.tags} */}
                {/* 分类页签 */}
                <TagSelect onChange={this.tagSelectChange}>
                    {
                        this.props.tags.map(tag => {
                            return (<TagSelect.Option key={tag} value={tag}>
                                {tag}
                            </TagSelect.Option>)
                        })
                    }
                </TagSelect>
                <Row type="flex" justify="start">
                    {
                        this.state.displayCourses.map((item, index) => {
                            return (
                                <Col key={index} style={{ padding: 10}} span={6}>
                                    {
                                        item.name ? (
                                            <Card
                                                hoverable
                                                title={item.name}
                                                cover={<img src={"/course/" + item.img} />}
                                                extra={
                                                    <Icon
                                                        onClick={e => this.addCart(e, item)}
                                                        type="shopping-cart"
                                                        style={{ fontSize: 18 }}
                                                    />
                                                }
                                                >
                                                    <Card.Meta
                                                        description={
                                                            <div>
                                                            <span>￥{item.price}</span>
                                                            <span style={{ float: "right" }}>
                                                                <Icon type="user" /> {item.solded}
                                                            </span>
                                                            </div>
                                                        }
                                                    />
                                                </Card>
                                        ) : (
                                            <Skeleton active={true} />
                                        )
                                    }
                                </Col>
                            )
                        })
                    }
                </Row>
            </div>
        )
    }
}

export default connect(state => ({
    courses: state.goods.courses,
    tags: state.goods.tags,
    loading: state.loading
}), {
    getList: () => ({
        type: 'goods/getList'
    }),
    addCart: (payload) => ({
        type: 'cart/addCart',
        payload
    })
})(Goods)