
const vnodeType = {
    HTML: 'HTML',
    TEXT: 'TEXT',
    COMPONENT: 'COMPONENT',
    CLASS_COMPONENT: 'CLASS_COMPONENT'
}
const childType = {
    EMPTY: 'EMPTY',
    SINGLE: 'SINGLE',
    MULTIPLE: 'MULTIPLE'
}

// 新建虚拟dom
// 名字 属性 子元素
function createElement(tag, data, children = null) {
    let flag
    if (typeof tag === 'string') {
        // 普通html
        flag = vnodeType.HTML
    } else if (typeof tag === 'function') {
        flag = vnodeType.COMPONENT
    } else {
        flag = vnodeType.TEXT
    }
    let childrenFlag
    if (children === null) {
        childrenFlag = childType.EMPTY
    } else if (Array.isArray(children)) {
        const len = children.length
        if (len === 0) {
            childrenFlag = childType.EMPTY
        } else {
            childrenFlag = childType.MULTIPLE
        }
    } else {
        // 其他情况都作为文本节点处理，即单个子节点，会调用 createTextVNode 创建纯文本类型的 VNode
        childrenFlag = childType.SINGLE
        children = createTextVnode(children + '')
    }

    // 返回vnode
    return {
        flag, // vnode类型
        tag, // 标签-div 文本没有tag 组件就是函数
        data,
        key: data && data.key,
        children,
        childrenFlag,
        el: null
    }
}

// 渲染虚拟dom
function render(vnode, container) {
    // 区分首次渲染和再次渲染
    if (container.vnode) {
        patch(container.vnode, vnode, container)
    } else {
        mount(vnode, container)
    }
    container.vnode = vnode
}

function createTextVnode(text) {
    return {
        flag: vnodeType.TEXT,
        tag: null,
        data: null,
        children: text,
        childrenFlag: childType.EMPTY
    }
}

function mount(vnode, container, flagNode) {
    const { flag } = vnode
    if (flag === vnodeType.HTML) {
        // 挂载普通元素节点
        mountElement(vnode, container, flagNode)
    } else if (flag === vnodeType.TEXT) {
        // 挂载文本节点
        mountText(vnode, container)
    }
}

function mountElement(vnode, container, flagNode) {
    const el = document.createElement(vnode.tag)
    vnode.el = el
    const { data, children, childrenFlag } = vnode
    if (data) {
        for (key in data) {
            // 元素 key 老值 新值
            patchData(el, key, null, data[key])
        }
    }
    if (childrenFlag !== childType.EMPTY) {
        if (childrenFlag === childType.SINGLE) {
            mount(children, el)
        } else if (childrenFlag === childType.MULTIPLE) {
            for (let i = 0; i < children.length; i++) {
                mount(children[i], el)
            }
        }
    }
    // container.appendChild(el)
    flagNode ? container.insertBefore(el, flagNode) : container.appendChild(el)
}

function mountText(vnode, container) {
    const el = document.createTextNode(vnode.children)
    vnode.el = el
    container.appendChild(el)
}

function patchData(el, key, prev, next) {
    switch (key) {
        case 'style':
            for (let k in next) {
                el.style[k] = next[k]
            }
            for (let k in prev) {
                if (next && !next.hasOwnProperty(k)) {
                    el.style[k] = ''
                }
            }
            break
        case 'class':
            el.className = next
            break
        default:
            if (key[0] === '@') {
                if (prev) {
                    el.removeEventListener(key.slice(1), prev)
                }
                if (next) {
                    el.addEventListener(key.slice(1), next)
                }
            } else {
                el.setAttribute(key, next)
            }
            break
    }
}

function patch(prev, next, container) {
    let prevFlag = prev.flag
    let nextFlag = next.flag
    // 如果两个不一致直接替换
    if (prevFlag !== nextFlag) {
        replaceVnode(prev, next, container)
    } else if (nextFlag === vnodeType.HTML) {
        patchElement(prev, next, container)
    } else if (nextFlag === vnodeType.TEXT) {
        patchText(prev, next)
    }

}

function replaceVnode(prev, next, container) {
    container.removeChild(prev.el)
    mount(next, container)
}

function patchElement(prev, next, container) {
    if (prev.tag !== next.tag) {
        replaceVnode(prev, next, container)
        return
    }
    let el = (next.el = prev.el)
    let prevData = prev.data
    let nextData = next.data
    if (nextData) {
        for (let key in nextData) {
            let prevVal = prevData[key]
            let nextVal = nextData[key]
            patchData(el, key, prevVal, nextVal)
        }
    }
    if (prevData) {
        for (let key in prevData) {
            let prevVal = prevData[key]
            if (prevVal && !nextData.hasOwnProperty(key)) {
                patchData(el, key, prevVal, null)
            }
        }
    }
    // data更新完毕 下面开始更新子元素
    patchChildren(prev.childrenFlag, next.childrenFlag, prev.children, next.children, el)   
}

function patchText(prev, next) {
    let el = (next.el = prev.el)
    if (prev.children !== next.children) {
        el.nodeValue = next.children
    }
}

function patchChildren(prevChildFlag, nextChildFlag, prevChildren, nextChildren, container) {
    // 1.老的是单独的，空的，多个
    // 2.新的是单独的，空的，多个
    switch (prevChildFlag) {
        case childType.SINGLE:
            switch (nextChildFlag) {
                case childType.SINGLE:
                    patch(prevChildren, nextChildren, container)
                    break
                case childType.EMPTY:
                    container.removeChild(prevChildren.el)
                    break;
                case childType.MULTIPLE:
                    container.removeChild(prevChildren.el)
                    for (let i = 0; i < nextChildren.length; i++) {
                        mount(nextChildren[i], container)
                    }
                    break;
            }
            break
        case childType.EMPTY:
            switch (nextChildFlag) {
                case childType.SINGLE:
                    mount(nextChildren, container)
                    break
                case childType.EMPTY:
                    break;
                case childType.MULTIPLE:
                    for (let i = 0; i < nextChildren.length; i++) {
                        mount(nextChildren[i], container)
                    }
                    break;
            }
            break
        case childType.MULTIPLE:
            switch (nextChildFlag) {
                case childType.SINGLE:
                    for (let i = 0; i < prevChildren.length; i++) {
                        container.removeChild(prevChildren[i].el)
                    }
                    mount(nextChildren, container)
                    break
                case childType.EMPTY:
                    for (let i = 0; i < prevChildren.length; i++) {
                        container.removeChild(prevChildren[i].el)
                    }
                    break;
                case childType.MULTIPLE:
                    // 众多虚拟dom 就在这里进行区分 每家策略不一致
                    console.log('新老都是数组')
                    // abc
                    // 新的abc 012顺序是递增的不需要修改
                    // 新的cab 201顺序不是递增的需要修改
                    // abc adfadfbdfac 只要相对顺序不变就可以
                    let lastIndex = 0
                    for (let i = 0; i < nextChildren.length; i++) {
                        let nextVnode = nextChildren[i]
                        let find = false
                        let j = 0
                        for (j; j < prevChildren.length; j++) {
                            let prevVnode = prevChildren[j]
                            if (prevVnode.key === nextVnode.key) {
                                find = true
                                // key相同认为是同一个元素
                                patch(prevVnode, nextVnode, container)
                                if (j < lastIndex) {
                                    // 需要移动
                                    // insertBefor移动元素
                                    // abc a移动到bc之间 abc父元素.inserBefore(b的下一个元素)
                                    let flagNode = nextChildren[i-1].el.nextSibling
                                    container.insertBefore(prevVnode.el, flagNode)
                                    break
                                } else {
                                    lastIndex = j
                                }
                            }
                        }
                        if (!find) {
                            // 需要新增的
                            let flagNode = i == 0 ? prevChildren[0].el : nextChildren[i-1].el.nextSibling
                            mount(nextVnode, container, flagNode)
                        }
                    }
                    // 移除不需要的元素
                    for (let i = 0; i < prevChildren.length; i++) {
                        const prevVnode = prevChildren[i]
                        const has = nextChildren.find(next => next.key === prevVnode.key)
                        if (!has) {
                            container.removeChild(prevVnode.el)
                        }
                    }
                    break;
            }
            break
    }
}