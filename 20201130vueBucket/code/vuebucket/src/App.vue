<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/cart">Cart</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login" v-if="!isLogin">Login</router-link>
      <span>{{loginState}}</span>
    </div>
    <div>
      {{count}}
      <button @click="onAdd">count加一</button>
    </div>
    <router-view/>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import kStore from './kStore'
export default {
  computed: {
    ...mapState(['isLogin']),
    ...mapGetters(['loginState']),
    count() {
      return kStore.state.count
    }
  },
  methods: {
    onAdd() {
      kStore.state.count ++
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
