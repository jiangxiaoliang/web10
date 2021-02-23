import React, { Component } from 'react';
import {SmileOutlined} from '@ant-design/icons'

//高阶组件：扩展现有表单，提供控件包装、事件处理、表单校验
function kFormCreate(Comp) {
    return class extends Component {
        constructor(props) {
            super(props)
            this.options = {}
            this.state = {}
        }
        // 包装函数：接收字段名和校验选项返回一个高阶组件
        getFieldDec = (field, option) => {
            this.options[field] = option
            return InputComp => (
                <div>
                    {
                        React.cloneElement(InputComp, {
                            name: field,
                            value: this.state[field] || '',
                            onChange: this.handleChange, // 执行校验等
                            onFocus: this.handleFocus,
                        })
                    }
                </div>
            )
        }
        // 处理输入事件
        handleChange = e => {
            const {name, value} = e.target
            this.setState({
                [name]: value
            }, () => {
                // 单字段校验
                this.validateField(name)
            })
        }
        validateField = field => {
            const rules = this.options[field].rules
            const isValid = !rules.some(rule => {
                if (rule.required) {
                    if (!this.state[field]) {
                        this.setState({
                            [field + 'Message']: rule.message
                        })
                        return true
                    }
                }
                return false
            })
            if (isValid) {
                this.setState({
                    [field + 'Message']: ''
                })
            }
            return isValid
        }
        validateFields = cb => {
            const rets = Object.keys(this.options).map(field => 
                this.validateField(field)
            )
            const ret = rets.every(v => v === true)
            cb(ret, this.state)
        }
        handleFocus = e => {
            const field = e.target.name
            this.setState({
                [field + 'Focus']: true
            })
        }
        isFieldTouched = field => {
            return !!this.state[field + 'Focus']
        }
        getFieldError = field => {
            return this.state[field + 'Message']
        }
        render() {
            return (
                <Comp
                    getFieldDec={this.getFieldDec}
                    validateFields={this.validateFields}
                    isFieldTouched={this.isFieldTouched}
                    getFieldError={this.getFieldError}
                />
            )
        }
    }
}

class KFromInput extends Component {
    render() {
        return (
            <div>
                {this.props.children}
                {
                    this.props.help && (
                        <p style={{color: this.props.validateState === 'error' ? 'red' : 'green'}}>
                            {this.props.help}
                        </p>
                    )
                }
            </div>
        )
    }
}

class KInput extends Component {
    render() {
        const {prefix, ...rest} = this.props
        return (
            <div>
                {prefix}
                <input {...rest} />
            </div>
        )
    }
}

@kFormCreate
class KForm extends Component {
    onSubmit = () => {
        this.props.validateFields((isValid, values) => {
            if (isValid) {
                console.log(values)
                alert('success')
            } else {
                console.log(values)
                alert('fail')
            }
        })
    }
    render() {
        const { getFieldDec, isFieldTouched, getFieldError } = this.props
        const unameError = isFieldTouched('username') && getFieldError('username')
        return (
            <div>
                <KFromInput
                    validateState='error'
                    help={unameError || ''}
                >
                    {
                        getFieldDec('username', {
                            rules: [{ required: true, message: "Please input your username!" }]
                        })(<KInput type='text' prefix={<SmileOutlined />} />)
                    }
                </KFromInput>
                <div>
                    {
                        getFieldDec('password', {
                            rules: [{ required: true, message: "Please input your password!" }]
                        })(<input type='password' />)
                    }
                </div>
                <button onClick={this.onSubmit}>确定</button>
            </div>
        );
    }
}

export default KForm