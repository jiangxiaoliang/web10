<template>
    <div>
        <label v-if="label">{{label}}</label>
        <slot></slot>
        <p v-if="errorMsg" class="error">{{errorMsg}}</p>
        <slot name="foo"></slot>
    </div>
</template>

<script>
    import Validator from 'async-validator'
    export default {
        name: 'KFormItem',
        props: ['label', 'prop'],
        inject: ['form'],
        data() {
            return {
                errorMsg: ''
            }
        },
        created() {
            this.$on('validate', this.validate)
        },
        methods: {
            validate() {
                return new Promise(resolve => {
                    // 校验规则制定
                    const descriptor = {[this.prop] : this.form.rules[this.prop]}
                    // 创建校验器
                    const validator = new Validator(descriptor)
                    // 执行校验
                    validator.validate({[this.prop] : this.form.model[this.prop]}, errors => {
                        if (errors) {
                            this.errorMsg = errors[0].message
                            resolve(false)
                        } else {
                            this.errorMsg = ''
                            resolve(true)
                        }
                    })
                })
            }
        }
    }
</script>

<style scoped>
    .error {
        color: red
    }
</style>