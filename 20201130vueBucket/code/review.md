[TOC]

# vue全家桶

## 1、vuex

- 安装：vue add vuex
- state,getter,mutations,actions,modules
- this.$store.commit('mutation'),this.$store.dispatch('action')
- mapState,mapGetters,mapMutations,mapActions
- vuex原理，简写kStore

## 2、router

- 安装：vue add router

- 路由配置，子路由

- router-link, router-view

- this.$route.params.x(/good/:id),this.$route.query.x(/detail?page=1),this.$route.push({name: 'xx', query: {xx}})

- 路由守卫

  - 全局路由守卫：beforeEach, beforeResolve, afterEach
  - 路由独享守卫：beforeEnter
  - 组件内守卫：beforeRouteEnter, beforeRouteUpdate, beforeRouteLeave
  - 完整解决流程：
    - 导航被触发。
    - 在失活的组件里调用 `beforeRouteLeave` 守卫。
    - 调用全局的 `beforeEach` 守卫。
    - 在重用的组件里调用 `beforeRouteUpdate` 守卫 (2.2+)。
    - 在路由配置里调用 `beforeEnter`。
    - 解析异步路由组件。
    - 在被激活的组件里调用 `beforeRouteEnter`。
    - 调用全局的 `beforeResolve` 守卫 (2.5+)。
    - 导航被确认。
    - 调用全局的 `afterEach` 钩子。
    - 触发 DOM 更新。
    - 调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入。
  - router原理：简写kRouter

  ## 3、作业

  - 购物车

  - 发布，解决history模式下刷新404问题

    - npm run build

    - 下载nginx

    - 配置 config/nginx.config

    - 起服务器：start nginx

      ```shell
      
      http {
          include       mime.types;
          default_type  application/octet-stream;
      
          #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
          #                  '$status $body_bytes_sent "$http_referer" '
          #                  '"$http_user_agent" "$http_x_forwarded_for"';
      
          #access_log  logs/access.log  main;
      
          sendfile        on;
          #tcp_nopush     on;
      
          #keepalive_timeout  0;
          keepalive_timeout  65;
      
          #gzip  on;
      
          server {
              listen       80;
              server_name  localhost;
      
              #charset koi8-r;
      
              #access_log  logs/host.access.log  main;
      		
      		# root E:\train\web10\20201130vueBucket\code\vuebucket\dist;
      
              location /kcart {
                  root E:\\train\web10\20201130vueBucket\code\vuebucket\dist;
                  try_files $uri /kcart/index.html;
                  # index /kcart/index.html; #404问题
              }
              location ^~ /api/ {
                  proxy_pass   http://localhost:3000; 
              }
          }
      ```

      