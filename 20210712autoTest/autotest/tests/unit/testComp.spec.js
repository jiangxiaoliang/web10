import Vue from 'vue'
import TestComp  from '@/components/Test.vue'
import { mount } from '@vue/test-utils'

describe('测试Test的vue组件', () => {
    it('初始化的message', () => {
        let data = TestComp.data()
        expect(data.message).toBe('vue-text')
    })
    it('生命周期created的message', () => {
        let vm = new Vue(TestComp).$mount()
        expect(vm.message).toBe('created-text')
    })
    it('点击以后的message', () => {
        let wrapper = mount(TestComp)
        wrapper.find('button').trigger('click')
        expect(wrapper.vm.message).toBe('click-text')
    })
})