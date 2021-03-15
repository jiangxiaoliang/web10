import { Layout, Menu, Dropdown, Badge, Icon } from 'antd'
import { Link } from 'umi'
import { connect } from 'dva'
import styles from './index.css'

const { Header, Content, Footer } = Layout

export default connect(state => ({
    count: state.cart.length,
    cart: state.cart
}))(function(props) {
    const pathname = props.location.pathname
    // const selectedKeys = pathname // 无法解决路由嵌套问题
    const menu = (
        <Menu>
            {
                props.cart.map((item, index) => (
                    <Menu.Item key={index}>
                        {item.name} × {item.count}
                        <span>￥{item.count * item.price}</span>
                    </Menu.Item>
                ))
            }
        </Menu>
    )
    const menus = [
        { path: '/', name: '商品' },
        { path: '/users', name: '用户' },
        { path: '/about', name: '我的' }
    ]
    const selectedKeys = menus.filter(menu => {
        if (menu.path === '/') {
            return pathname === '/'
        }
        return pathname.indexOf(menu.path) !== -1
    }).map(menu => menu.path)
    return (
        <Layout>
            <Header className={styles.header}>
                <img className={styles.logo} src="https://img.kaikeba.com/logo-new.png" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={selectedKeys}
                    style={{ lineHeight: "64px", float: 'left' }}
                >
                    {
                        menus.map(menu => (
                            <Menu.Item key={menu.path}>
                                <Link to={menu.path}>{menu.name}</Link>
                            </Menu.Item>
                        ))
                    }
                </Menu>
                <Dropdown overlay={menu} placement={"bottomRight"}>
                    <div style={{ float: "right" }}>
                        <Icon type="shopping-cart" style={{ fontSize: 18 }} />
                        <span>我的购物车</span>
                        <Badge count={props.count} offset={[-4, -18]} />
                    </div>
                </Dropdown>
            </Header>
            <Content className={styles.content}>
                <div className={styles.box}>{props.children}</div>
            </Content>
            <Footer className={styles.footer}>独家专享</Footer>
        </Layout>
    )
})