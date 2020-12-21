<template>
    <div>
        <div class="good" v-for="item in cart" :key="item.id">
            {{item.title}}
            <div class="right">
                <i class="cubeic-remove" @click="removeCart(item.id)"></i>
                <span>{{item.cartCount}}</span>
                <i class="cubeic-add" @click="cartAdd(item.id)"></i>
            </div>
        </div>
        <div>总价 {{total}}</div>

        <cube-button :disabled="true" v-if="total < minTotal">还差{{minTotal-total}}可以购买</cube-button>
        <cube-button v-else>
            下单
            <span v-if="!isLogin">(需要登陆)</span>
        </cube-button>
    </div>
</template>

<script>
    import {mapState, mapGetters} from 'vuex'
    export default {
        data() {
            return {
                minTotal: 1000
            }
        },
        computed: {
            ...mapState({
                cart: state => state.cart.list,
                isLogin: state => state.user.isLogin
            }),
            ...mapGetters(['total'])
        },
        methods: {
            removeCart(id) {
                this.$store.commit('removeCart', id)
            },
            cartAdd(id) {
                this.$store.commit('cartAdd', id)
            }
        },
    }
</script>

<style lang="stylus" scoped>
.good {
    padding 10px
    text-align left 
    .right {
        float right 
    }
    i {
        font-size 18px
    }
}
</style>