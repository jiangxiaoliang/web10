import Vue from 'vue'
import TestComp from '@/components/Test'
import { mount } from '@vue/test-utils'

describe('TestComponent', () => {
    // 检查原始组件选项
    it('create生命周期', () => {
        expect(typeof TestComp.created).toBe('function')
    })

    // 评估原始组件选项中的函数的结果
    it('初始data是jxl', () => {
        // 检查data函数存在性
        expect(typeof TestComp.data).toBe('function')
        // 检查data返回的默认值
        const defaultData = TestComp.data()
        expect(defaultData.message).toBe('jxl')
    })

    // 检查mounted之后
    it('mounted之后是中文', () => {
        const vm = new Vue(TestComp).$mount()
        expect(vm.message).toBe('中文')
    })

    it('按钮点击之后', async () => {
        const wrapper = mount(TestComp)
        await wrapper.find('button').trigger('click')
        // 测试数据变化
        expect(wrapper.vm.message).toBe('按钮点击')
        // 测试html渲染结果
        expect(wrapper.find('span').html()).toBe('<span>按钮点击</span>')
        // 等效方式
        expect(wrapper.find('span').text()).toBe('按钮点击')
    })
})