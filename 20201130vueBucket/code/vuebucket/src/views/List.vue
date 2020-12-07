<template>
    <div>
        <h3>列表页</h3>
        <ul>
            <li v-for="good in goods" :key="good.id">
                <router-link :to="`/detail/${good.id}`">
                    <span>{{good.text}}</span>
                    <span>￥{{good.price}}</span>
                    <button @click.prevent.stop="addCart(good)">添加购物车</button>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                goods: [
                    {id: 1, text: 'js高级', price: 59},
                    {id: 2, text: 'web高级', price: 60}
                ]
            }
        },
        methods: {
            addCart(good) {
                this.$store.commit('addCart', good)
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>