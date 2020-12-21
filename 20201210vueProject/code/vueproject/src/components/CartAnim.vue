<template>
    <div class="ball-wrap">
        <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div class="ball" v-show="show" :style="pos">
                <div class="inner">
                    <div class="cubeic-add"></div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'CartAnim',
        props: ['pos'],
        data() {
            return {
                show: false
            }
        },
        methods: {
            start(el) { // 启动动画接⼝口，传递点击按钮元素
                this.el = el
                // 使.ball显示，激活动画钩⼦子
                this.show = true
            },
            beforeEnter(el) {
                // 把小球移动到点击的dom元素所在位置
                const rect = this.el.getBoundingClientRect()
                // 转换为⽤用于绝对定位的坐标
                const x = rect.left - (window.innerWidth / 2)
                const y = -(window.innerHeight - rect.top)
                // ball只移动y
                el.style.transform = `translate3d(0, ${y}px, 0)`
                // inner只移动x
                const inner = el.querySelector('.inner')
                inner.style.transform = `translate3d(${x}px, 0, 0)`
            },
            enter(el, done) {
                // 获取offsetHeight就会重绘
                document.body.offsetHeight
                // 指定动画结束位置
                el.style.transform = `translate3d(0, 0, 0)`
                const inner = el.querySelector('.inner')
                inner.style.transform = `translate3d(0, 0, 0)`
                el.addEventListener('transitionend', done)
            },
            afterEnter(el) {
                // 动画结束，开始清理理⼯工作
                this.show = false
                el.style.display = 'none'
                this.$emit('transitionend')
            }
        },
    }
</script>

<style lang="stylus">
.ball-wrap {
    .ball {
        position fixed
        left 50%
        bottom 10px
        z-index 1000000
        color red
        transition: all .5s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner {
            width 16px
            height 16px
            transition all .5s linear 
            .cubeic-add {
                font-size: 22px;
            }
        }
    }
}
</style>