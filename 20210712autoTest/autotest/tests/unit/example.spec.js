// import { shallowMount } from '@vue/test-utils'
// import HelloWorld from '@/components/HelloWorld.vue'

// describe('HelloWorld.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message'
//     const wrapper = shallowMount(HelloWorld, {
//       propsData: { msg }
//     })
//     expect(wrapper.text()).toMatch(msg)
//   })
// })

function add(num1, num2) {
  if (Number(num1) == num1) {
    num1 = Number(num1)
  }
  if (Number(num2) == num2) {
    num2 = Number(num2)
  }
  return num1 + num2
}

describe('加法测试', () => {
  it('两个数字相加', () => {
    const res = add(1, 2)
    expect(res).toBe(3)
  })
  it('数字和字符串相加', () => {
    const res = add(1, 'a')
    expect(res).toBe('1a')
  })
  it('数字和字符串数字相加', () => {
    const res = add(1, '1')
    expect(res).toBe(2)
  })
  it('字符串数字和字符串数字相加', () => {
    const res = add('4', '6')
    expect(res).toBe(10)
  })
})
