<template>
    <div>
        <h3>kForm表单</h3>
        <hr />
        <!-- <k-input type="text" :value="model.username" @input="model.username = $event" /> -->
        <k-form :model="model" :rules="rules" ref="KForm">
            <k-form-item label="用户名" prop="username">
                <k-input v-model="model.username" />
            <!-- <template v-slot: foo><p>foo content</p></template> -->
            </k-form-item>
            <k-form-item label="密码" prop="password">
                <k-input type="password" v-model="model.password" />
            </k-form-item>
            <k-form-item>
                <el-button type="primary" @click="submitForm('KForm')">提交</el-button>
            </k-form-item>
        </k-form>

        <h3>elment表单</h3>
        <hr />
        <el-form :model="model" :rules="rules" ref="loginForm">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="model.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="password">
                <el-input type="password" v-model="model.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import KInput from './KInput.vue'
    import KFormItem from './KFormItem.vue'
    import KForm from './KForm'
    export default {
        name: 'FormTest',
        components: {
            KInput,
            KFormItem,
            KForm
        },
        data() {
            return {
                 model: { username: "tom", password: "" },
                 rules: {
                     username: [{ required: true, message: "请输入用户名" }],
                    password: [{ required: true, message: "请输入密码" }]
                 } 
            }
        },
        methods: {
            submitForm(form) {
                this.$refs[form].validate(valid => {
                    if (valid) {
                        alert('请求登陆')
                    } else {
                        alert('校验失败')
                    }
                })
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>