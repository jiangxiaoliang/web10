import Vue from 'vue'

export default function(Component, props) {
    const instance = new Vue({
        render(h) {
            return h(Component, {props})
        }
    }).$mount()
    document.body.appendChild(instance.$el)
    const comp = instance.$children[0]
    comp.remove = () => {
        document.body.removeChild(instance.$el)
        instance.$destroy()
    }
    return comp
}