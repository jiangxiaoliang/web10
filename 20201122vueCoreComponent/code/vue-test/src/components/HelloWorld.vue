<template>
  <div class="hello">
    <!-- 条件 -->
    <p :title="title" v-if="title">{{title}}</p>

    <!-- 用户输入 -->
    <div>
      <input type='text' v-model="text" />
      <button @click="addGood">添加商品</button>
    </div>

    <!-- 循环 -->
    <ul>
      <li v-for="good in goods" :key="good.id">
        <span>{{good.text}}</span>
        <span>￥{{good.price}}</span>
        <button @click="addCart(good)">添加购物车</button>
      </li>
    </ul>
    <!-- {{cart}} -->
    <!-- 购物车 -->
    <cart title="列表" ref="cart" @addCartSucc="onAddCart"></cart>
  </div>
</template>

<script>
import Cart from './Cart'
export default {
  name: 'HelloWorld',
  components: {
    Cart
  },
  data() {
    return {
      title: '',
      goods: [
        {id: 1, text: 'js高级', price: 59},
        {id: 2, text: 'web高级', price: 60}
      ],
      text: '',
      // cart: []
    }
  },
  created() {
    setTimeout(() => {
      this.title = 'are you oka?'
    }, 1500)
  },
  methods: {
    addGood() {
      if (this.text) {
        this.goods.push({
          id: this.goods.length + 1,
          text: this.text,
          price: 100
        })
        this.text = ''
      }
    },
    addCart(good) {
      // 添加购物车
      // let ret = this.cart.find(item => item.id === good.id)
      // if (ret) {
      //   ret.count += 1
      // } else {
      //   this.cart.push({...good, count: 1})
      // }

      // this.$refs.cart.addCart(good)
      this.$bus.$emit('addCart', good)
    },
    onAddCart() {
      console.log('add cart success')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
