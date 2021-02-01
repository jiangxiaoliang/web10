<template>
  <div class="home">
    <button v-permission="['admin', 'editor']">editor button</button>
    <button v-permission="['admin']">admin button</button>
    <el-tabs>
      <el-tab-pane label="用户管理" name="first" v-permission="['admin', 'editor']">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理" name="second" v-permission="['admin', 'editor']">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third" v-permission="['admin']">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth" v-permission="['admin', 'editor']">定时任务补偿</el-tab-pane>
    </el-tabs>
    <el-tabs>
      <el-tab-pane label="用户管理" name="first" v-if="checkPermission(['admin', 'editor'])">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理" name="second" v-if="checkPermission(['admin', 'editor'])">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third" v-if="checkPermission(['admin'])">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth" v-if="checkPermission(['admin', 'editor'])">定时任务补偿</el-tab-pane>
    </el-tabs>
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    // HelloWorld
  },
  computed: {
    ...mapGetters(['roles'])
  },
  methods: {
    checkPermission(permissionRoles) {
      // console.log(this.roles, permissionRoles)
      return this.roles.some(role => {
        return permissionRoles.includes(role)
      })
    } 
  }
}
</script>
