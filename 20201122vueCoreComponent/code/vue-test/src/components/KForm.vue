<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        // provide返回的对象可以跨层级传参给子孙
        provide() {
            return {
                form: this // 表单实例传递给后代
            }
        },
        props: {
            model: {
                type: Object,
                required: true
            },
            rules: {
                type: Object
            }
        },
        methods: {
            async validate(cb) {
                // 执行所有表单的校验
                const tasks = this.$children.filter(item => item.prop).map(item => item.validate())
                const results = await Promise.all(tasks)
                if (results.some(item => !item)) {
                    cb(false)
                } else {
                    cb(true)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>