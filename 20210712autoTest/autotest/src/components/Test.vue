<template>
    <div>
        <p>{{message}}</p>
        <button @click="changeMessage">点击</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: 'vue-text'
        }
    },
    created() {
        this.message = 'created-text'
    },
    methods: {
        changeMessage() {
            this.message = 'click-text'
        }
    },
}
</script>

<style>

</style>