<template>
    <div>
        <span>{{message}}</span>
        <button @click="changeMsg">点击</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message: 'jxl'
            }
        },
        created() {
            this.message = '中文'
        },
        methods: {
            changeMsg() {
                this.message = '按钮点击'
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>