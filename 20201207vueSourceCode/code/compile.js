/**
 * new Compile(el, vm)
 */

 class Compile {
     constructor(el, vm) {
         this.$el = document.querySelector(el)
         this.$vm = vm

         if (this.$el) {
             // 提取宿主中模板内容到Fragment标签，dom操作会提高效率
             this.$fragment = this.node2Fragment(this.$el)
             // 编译模板内容，同时进行依赖收集
             this.compile(this.$fragment)
             this.$el.appendChild(this.$fragment)
         }
     }

     node2Fragment(el) {
        const fragemnt = document.createDocumentFragment()
        let child
        while ((child = el.firstChild)) {
            fragemnt.appendChild(child)
        }
        return fragemnt
     }

     compile(el) {
        const childNodes = el.childNodes
        Array.from(childNodes).forEach(node => {
            if (node.nodeType === 1) {
                // element节点
                // console.log('编译元素节点' + node.nodeName)
                this.compileElement(node)
            } else if (this.isInterpolation(node)) {
                // 插值表达式
                // console.log('编译插值文本'+node.textContent)
                this.compileText(node)
            }
            // 递归子节点
            if (node.childNodes && node.childNodes.length > 0) {
                this.compile(node)
            }
        })
     }

     isInterpolation(node) {
         // 是文本且符合{{}}
         return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
     }

     compileElement(node) {
        // <div k-text='test' @click="abc"></div>
        let nodeAttrs = node.attributes
        Array.from(nodeAttrs).forEach(attr => {
            const attrName = attr.name
            const exp = attr.value
            if (this.isDirective(attrName)) {
                const dir = attrName.substring(2)
                this[dir] && this[dir](node, this.$vm, exp)
            }
            if (this.isEvent(attrName)) {
                const dir = attrName.substring(1)
                this.eventHanlder(node, this.$vm, exp, dir)
            }
        })
     }

     isDirective(attr) {
         return attr.indexOf('k-') === 0
     }

     isEvent(attr) {
         return attr.indexOf('@') === 0
     }     

     compileText(node) {
        //  console.log(RegExp.$1)
        //  node.textContent = this.$vm[RegExp.$1]
         this.update(node, this.$vm, RegExp.$1, 'text')
     }

     update(node, vm, exp, dir) {
         let updateFn = this[dir + 'Updater']
         updateFn && updateFn(node, vm[exp])
         // 依赖收集
         new Watcher(vm, exp, function(value) {
             updateFn && updateFn(node, value)
         })
     }

     textUpdater(node, val) {
        node.textContent = val
     }

     text(node, vm, exp) {
         this.update(node, vm, exp, 'text')
     }

     html(node, vm, exp) {
         this.update(node, vm, exp, 'html')
     }
     
     model(node, vm, exp) {
         // data -> view
         this.update(node, vm, exp, 'model')
         // view -> data
         node.addEventListener('input', e => {
             vm[exp] = e.target.value
         })
     }

     htmlUpdater(node, val) {
         node.innerHTML = val
     }

     modelUpdater(node, val) {
        node.value = val
     }

     eventHanlder(node, vm, exp, dir) {
         const fn = vm.$options.methods && vm.$options.methods[exp]
         if (dir && fn) {
             node.addEventListener(dir, fn.bind(vm))
         }
     }
 }