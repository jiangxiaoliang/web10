<template>
    <div>
        <h2>商品详情页</h2>
        <!-- {{$route.params.id}} -->
        <pre>{{goodInfo}}</pre>
    </div>
</template>

<script>
    export default {
        async asyncData({$axios, params, error}) {
            const result = await $axios.$get('/api/detail', { params })
            if (result.ok) {
                return {
                    goodInfo: result.data
                }
            }
            error({
                statusCode: 400,
                message: '查询数据失败'
            })
        }
    }
</script>

<style lang="scss" scoped>

</style>