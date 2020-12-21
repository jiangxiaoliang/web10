<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <button v-if="$store.state.user.isLogin" @click="logout">注销</button>
    </div>
    <router-view/> -->

    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
    <cube-tab-bar v-model="selectLabel" :data="tabs" @change="changeHandler">
      <cube-tab v-for="(item, index) in tabs" :icon="item.icon" :label="item.value" :key="index">
        <div>{{item.label}}</div>
        <span class="badge" v-if="item.label === 'Cart' && cartTotal !== 0">{{cartTotal}}</span>
      </cube-tab>
    </cube-tab-bar>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      transitionName: 'route-forward',
      selectLabel: '/',
      tabs: [
        {
          label: "Home",
          value: "/",
          icon: "cubeic-home"
        },
        {
          label: "Cart",
          value: "/cart",
          icon: "cubeic-mall"
        },
        {
          label: "Me",
          value: "/about",
          icon: "cubeic-person"
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['cartTotal'])
  },
  created() {
    this.selectLabel = this.$route.path
  },
  watch: {
    $route(route) {
      // 监听路由变化并动态设置页签选中状态
      this.selectLabel = route.path
      // console.log(this.$router.transitionName)
      this.transitionName = this.$router.transitionName
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    },
    changeHandler(val) {
      // console.log(val)
      this.$router.push(val)
    }
  },
}
</script>

<style lang="stylus" scoped>
.cube-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #edf0f4;
}
.route-forward-enter {
  transform: translate3d(-100%, 0, 0);
}
.route-back-enter {
  transform: translate3d(100%, 0, 0);
}
/* 出场后 */
.route-forward-leave-to {
  transform: translate3d(100%, 0, 0);
}
.route-back-leave-to {
  transform: translate3d(-100%, 0, 0);
}
.route-forward-enter-active,
.route-forward-leave-active,
.route-back-enter-active,
.route-back-leave-active {
  transition: transform 0.3s;
}
.child-view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  padding-bottom: 40px;
}
.cube-tab {
  position: relative;
}
span.badge {
  background: red;
  color: white;
  border-radius: 50%;
  padding: 2px;
  min-width: 16px;
  min-height: 16px;
  position: absolute;
  right: 20%;
  top: 0;
}
</style>
