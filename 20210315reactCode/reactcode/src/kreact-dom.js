import { initVNode } from './kvdom'
function render(vdom, container) {
    // container.innerHTML = `<pre>${JSON.stringify(vdom, null, 2)}</pre>`
    container.appendChild(initVNode(vdom))
}

const reactdom = { render }
export default reactdom