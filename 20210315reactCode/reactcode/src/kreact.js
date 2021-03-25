function createElement(type, props, ...children) {
    // console.log(children)
    if (props === null) {
        props = {}
    }
    props.children = children
    // 区分组件类型
    // vtype: 1-原生标签 2-函数组件 3-类组件
    let vtype
    if (typeof type === 'string') {
        vtype = 1
    } else {
        // console.log(typeof type)
        if (type.isReactComponent) {
            vtype = 3
        } else {
            vtype = 2
        }
    }
    return {vtype, type, props }
}

export class Component {
    static isReactComponent = true
    constructor(props) {
        this.props = props
    }
    setState() {}
    forceUpdate() {}
}

const React = { createElement }
export default React