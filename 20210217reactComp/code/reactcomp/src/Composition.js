import React from 'react'

// Dialog作为容器不关系内容和逻辑
function Dialog(props) {
    return (
        <div style={{border: `1px solid ${props.color || 'blue'}`}}>
            {/* children是固定名称，类似匿名插槽 */}
            {props.children}
            <div>
                {props.foo('这个内容是dailog传递的')}
            </div>
            <div>
                {/* 具名插槽 */}
                {props.footer}
            </div>
        </div>
    )
}

// WelcomeDialog通过复合提供内容
function WelcomeDialog(props) {
    const footer = <button onClick={() => console.log('footer')}>确定</button>
    return (
        // 传递任意合法的表达式
        <Dialog color='red' footer={footer} foo={c => <p>{c}</p>}>
            <h1>欢迎光临</h1>
            <p>谢谢使用</p>
        </Dialog>
    )
}

function FilterP(props) {
    return (
        <div>
            {
                React.Children.map(props.children, child => {
                    console.log(child) // vdom
                    if (child.type !== 'p') {
                        return
                    }
                    return child
                })
            }
        </div>
    )
}

function RadioGroup(props) {
    return (
        <div>
            {
                React.Children.map(props.children, child => 
                    React.cloneElement(child, {name: props.name})
                )
            }
        </div>
    )
}

function Radio(props) {
    return (
        <label>
            <input type='radio' name={props.name} />
            {props.children}
        </label>
    )
}

export default function Composition() {
    return (
        <>
            <WelcomeDialog />
            <FilterP>
                <h1>foo</h1>
                <p>bar</p>
                <h1>mike</h1>
                <p>jerry</p>
            </FilterP>
            <RadioGroup name="mvvm">
                <Radio value='vue'>vue</Radio>
                <Radio value='react'>react</Radio>
                <Radio value='angular'>angular</Radio>
            </RadioGroup>
        </>
    )
}