<template>
    <div>
        Index page
        <p>num:{{$store.state.count}}</p>
        <button @click="$store.commit('add')">加一</button>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>