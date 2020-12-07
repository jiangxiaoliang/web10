import Vue from 'vue'

class KRouter {
    constructor(Vue, options) {
        this.$options = options
        this.routeMap = {}
        this.app = new Vue({
            data: {
                current: '#/'
            }
        })
        this.init()
        this.createRouteMap(this.$options)
        this.initComponent(Vue)
    }

    // 初始化hashchange
    init() {
        window.addEventListener('load', this.onHashChange.bind(this), false)
        window.addEventListener('haschange', this.onHashChange.bind(this), false)
    }

    createRouteMap(options) {
        options.routes.map(item => {
            this.routeMap[item.path] = item.component
        })
    }

    initComponent(Vue) {
        Vue.component('router-link', {
            props: {
                to: String
            },
            render: function(h) {
                return h(
                    "a",
                    { attrs: { href: this.to }},
                    this.$slot.default
                )
            }
        })
        const _this = this
        Vue.component('router-view', {
            render(h) {
                var component = _this.routeMap[_this.app.current]
                return h(component)
            }
        })
    }

    // 设置当前路径
    onHashChange() {
        this.app.current = this.getHash()
    }

    // 获取当前hash串
    getHash() {
        return window.location.hash.slice(1) || '/'
    }
}