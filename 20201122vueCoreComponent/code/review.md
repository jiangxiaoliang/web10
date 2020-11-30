[TOC]

# Vue核心API和组件化实践

## 1、vue核心API
---
### 1.1、差值表达式  {{表达式}}
### 1.2、属性绑定
### 1.3、条件语句
```vue
<p :title="title" v-if="title">{{title}}</p>
```

### 1.4、循环 v-for

### 1.5、双向绑定 v-model

### 1.6、购物车案例

#### 1.6.1 、数据传输方式

- 父组件->子组件: props,ref方式调用子组件方法，通过总线的方式

  ```vue
  <cart title="列表" ref="cart" @addCartSucc="onAddCart"></cart>
  this.refs.cart.addCart(good)
  
  总线：
  main.js
  Vue.prototype.$bus = new Vue
  父组件：this.$bus.$emit('addCart', good)
  子组件：created方法 this.$bus.$on('addCart', good = > this.addCart(good))
  ```

- 子组件->父组件：派发事件的方式

#### 1.6.2、计算属性和数据监听

- 计算属性

  ```vue
  computed: {
  	total() {
  		return this.cart.reduce((sum, item) => {
  			if (item.active) {
  				sum += item.price * item.count
  			}
  			return sum
  		}, 0)
  	}
  }
  ```

- 数据监听

  ```vue
  watch: {
  	cart(newValue, oldValue) {
  		window.localStorage.setItem('cart', JSON.stringify(newValue))
  	}
  }
  
  上述不能深度监听
  watch: {
  	cart: {
  		deep: true,
  		handler(newVlaue, oldValue) {
  			window.localStorage.setItem('cart', JSON.stringify(newValue))
  		}
  	}
  }
  ```

  

## 2、组件化实践

- 仿照elementUI的Form组件

  - KInput组件实现，v-model实现原理：value和input或者chang事件的语法糖

    ```vue
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
    ```

  - KFormItem实现

    ```vue
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
    ```

  - KForm实现

    ```vue
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
    ```

  - FormTest

    ```vue
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
    ```

    