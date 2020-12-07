<template>
    <table border="1">
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
        computed: {
            cart() {
                return this.$store.state.cart
            },
            total() {
                return this.cart.reduce((sum, item) => {
                    if (item.active) {
                        sum += item.count * item.price
                    }
                    return sum
                }, 0)
            }
        }
    }
</script>

<style scoped>
    .inactive {
        color: gray;
    }
</style>