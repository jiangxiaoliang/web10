<template>
    <div>
        <input :type="type" :value="value" @input="onInput" />
    </div>
</template>

<script>
    export default {
        name: 'KInput',
        props: {
            type: {
                type: String,
                default: 'text'
            },
            value: {
                type: String,
                default: ''
            }
        },
        methods: {
            onInput(e) {
                this.$emit('input', e.target.value)
                
                // 通知父级校验
                this.$parent.$emit('validate')
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>