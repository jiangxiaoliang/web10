<template>
  <div class="home">
    <Header title="首页">
      <i class="cubeic-tag"></i>
    </Header>
    <!-- 轮播图 -->
    <cube-slide :data="slider" :interval="800">
      <cube-slide-item v-for="(item, index) in slider" :key="index">
        <router-link :to="`/detail/${item.id}`">
          <img class="slider" :src="item.img" />
        </router-link>
      </cube-slide-item>
    </cube-slide>
    <!-- 商品列表 -->
    <!-- <goods-list :data="goods" @cartanim="$refs.ca.start($event)"></goods-list> -->
    <goods-list :data="goods" @cartanim="startCartAnim"></goods-list>
    <!-- 动画组件 -->
    <!-- <cart-anim ref="ca"></cart-anim> -->
  </div>
</template>

<script>
// import axios from 'axios'
import Header from '@/components/Header'
import gs from '@/server/goods'
import GoodsList from '@/components/GoodsList'
import CartAnim from '@/components/CartAnim'
export default {
  name: 'Home',
  components: {
    GoodsList,
    // CartAnim,
    Header
  },
  data() {
    return {
      goodsInfo: {},
      slider: [],
      keys: []
    }
  },
  computed: {
    goods() {
      // [[{},{}],[{},{}]] => [{},{}...]
      return this.keys.flatMap(key => this.goodsInfo[key]) 
    }
  },
  created () {
    // axios.get('/api/userInfo').then(res => console.log(res.data))
    gs.getGoodsInfo().then(data => {
      if (data) {
        this.goodsInfo = data.goodsInfo
        this.slider = data.slider
        this.keys = data.keys
      }
    })
  },
  methods: {
    startCartAnim(el) {
      // const anim = this.$createCartAnim({
      //   onTransitionend() {
      //     anim.remove()
      //   }
      // })
      // anim.start(el)

      // 第二种用法
      const anim = this.$create(CartAnim, {
        pos: {
          left: '46%',
          bottom: '30px'
        }
      })
      anim.start(el)
      anim.$on('transitionend', anim.remove)
    }
  },
}
</script>

<style lang="stylus" scoped>
.cube-slide {
  height: auto
}
.cube-slide-item > a > img {
  width 100%
  height auto
}
</style>
