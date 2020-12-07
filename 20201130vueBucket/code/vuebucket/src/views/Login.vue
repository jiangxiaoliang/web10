<template>
    <div>
        <h2>登陆页面</h2>
        <button @click="login" :disabled="isLoading">{{isLoading ? '登陆中' : '登陆'}}</button>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
        data() {
            return {
                isLoading: false
            }
        },
        methods: {
            ...mapActions(['requestLogin']),
            login() {
                // window.isLogin = true
                // this.$store.commit('login')
                this.isLoading = true
                // this.$store.dispatch('requestLogin').then(res => {
                //     if (res) {
                //         this.isLoading= false
                //         const redirectPath = this.$route.query.redirect
                //         console.log(redirectPath)
                //         this.$router.push(redirectPath)
                //     }
                // })

                this.requestLogin({username: 'tom'}).then(res => {
                    if (res) {
                        this.isLoading= false
                        const redirectPath = this.$route.query.redirect
                        console.log(redirectPath)
                        this.$router.push(redirectPath)
                    }
                })
                
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>