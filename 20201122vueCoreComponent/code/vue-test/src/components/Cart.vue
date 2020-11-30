<template>
   <table border="1">
       <caption>{{title}}</caption>
       <thead>
           <tr>
               <th></th>
               <th>课程名</th>
               <th>单价</th>
               <th>数量</th>
               <th>价格</th>
           </tr>
       </thead>
       <tbody>
           <tr v-for="item in cart" :key="item.id" :class="{inactive: !item.active}">
               <td>
                   <input type="checkbox" v-model="item.active" />
               </td>
               <td>{{item.text}}</td>
               <td>{{item.price}}</td>
               <td>{{item.count}}</td>
               <td>{{(item.count * item.price).toFixed(2)}}</td>
           </tr>
       </tbody>
       <tfoot>
           <tr>
               <td colspan="4" align="right">总价</td>
               <td>￥{{total}}</td>
           </tr>
       </tfoot>
   </table>
</template>

<script>
    export default {
        name: 'Cart',
        data() {
            return {
                cart: JSON.parse(window.localStorage.getItem('cart')) || []
            }
        },
        props: {
            title: {
                type: String,
                default: ''
            }
        },
        computed: {
            total() {
                return this.cart.reduce((sum, item) => {
                    if (item.active) {
                        sum += item.price * item.count
                    }
                    return sum
                }, 0)
            }
        },
        created() {
            this.$bus.$on('addCart', good => this.addCart(good))
        },
        methods: {
            addCart(good) {
                // 添加购物车
                let ret = this.cart.find(item => item.id === good.id)
                if (ret) {
                    ret.count += 1
                } else {
                    this.cart.push({...good, count: 1, active: true})
                }
                this.$emit('addCartSucc')
            }
        },
        watch: {
            // cart(newValue) {
            //     window.localStorage.setItem('cart', JSON.stringify(newValue))
            // }
            cart: {
                deep: true,
                handler(newValue) {
                    window.localStorage.setItem('cart', JSON.stringify(newValue))
                }
            }
        }
    }
</script>

<style scoped>
    .inactive {
        color: gray;
    }
</style>