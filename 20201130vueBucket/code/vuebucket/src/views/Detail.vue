<template>
    <div>
        <h3>详情页</h3>
        {{$route.params.id}}
        <hr />
        {{id}}
    </div>
</template>

<script>
    export default {
        props: ['id']
    }
</script>

<style lang="scss" scoped>

</style>