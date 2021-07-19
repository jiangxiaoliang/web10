<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <h1 id="message">{{title}}</h1>
    <button @click="changeTitle">点击</button>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      title: '文案'
    }
  },
  methods: {
    changeTitle() {
      this.title = '点击文案'
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
