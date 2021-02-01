<template>
    <el-breadcrumb class="app-breadcrumb" separator="/">
        <transition-group name="breadcrumb">
            <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
                <!-- 不能跳转：路由没有配置重定向或当前项已经是最后一项 -->
                <span
                    v-if="item.redirect==='noRedirect' || index === levelList.length-1"
                    class="no-redirect"
                >{{item.meta.title}}</span>
                <a v-else @click.prevent="handleLink(item)">{{item.meta.title}}</a>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>

<script>
    import pathToRegexp from 'path-to-regexp'
    export default {
        data() {
            return {
                levelList: null
            }
        },
        watch: {
            // 观察$route变化重新生产面包屑
            $route: {
                handler() {
                    this.getBreadcrumb()
                },
                immediate: true
            }
        },
        methods: {
            getBreadcrumb() {
                console.log(this.$route.matched)
                // 面包屑仅显示包含meta.title且item.meta.breadcrumb不为false的路由
                // /about/bla
                // matched: [{path:'/'}, '/about', '/about/bla']
                let matched = this.$route.matched.filter(item => {
                    return item.meta && item.meta.title && item.meta.breadcrumb !== false
                })
                // 根路由
                const first = matched[0]
                // 根匹配不是home，就作为home的下一级
                if (!this.isHome(first)) {
                    matched = [
                        {
                            path:'/',
                            redirect: '/home',
                            name: 'home',
                            meta: {
                                title: '首页',
                            }
                        }
                    ].concat(matched)
                }
                this.levelList = matched
            },
            isHome(route) {
                const name = route && route.name
                // console.log(name)
                if (!name) {
                    return true
                }
                return name.trim().toLocaleLowerCase() === 'home'
            },
            handleLink(item) {
                const { redirect, path } = item
                if (redirect) {
                    this.$router.push(redirect)
                    return
                }
                this.$router.push(this.pathCompile(path))
            },
            pathCompile(path) {
                const { params } = this.$route
                var toPath = pathToRegexp.compile(path)
                return toPath(params)
            }
        },
    }
</script>

<style scoped>
    .app-breadcrumb.el-breadcrumb {
        display: inline-block;
        font-size: 14px;
        line-height: 50px;
        margin-left: 8px;
    }
    .app-breadcrumb.el-breadcrumb .no-redirect {
        color: #97a8be;
        cursor: text;
    }
    .breadcrumb-enter-active, .breadcrumb-leave-active {
        transition: all .8s;
    }
    .breadcrumb-enter,.breadcrumb-leave-to {
        opacity: 0;
        transform: translateX(20px);
    }
</style>