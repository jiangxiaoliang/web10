export default {
    state: {
        list: JSON.parse(window.localStorage.getItem('cart')) || []
    },
    getters: {
        total(state) {
            return state.list.reduce((total, item) => total += item.cartCount * item.price, 0)
        },
        cartTotal(state) {
            let num = 0
            state.list.forEach(v => {
                num += v.cartCount
            })
            return num
        }
    },
    mutations: {
        addCart(state, item) {
            const good = state.list.find(v => v.title === item.title)
            if (good) {
                good.cartCount += 1
            } else {
                state.list.push({
                    ...item,
                    cartCount: 1
                })
            }
        },
        removeCart(state, id) {
            let good = state.list.find(v => v.id === id)
            if (good.cartCount > 0) {
                good.cartCount -= 1
            }
        },
        cartAdd(state, id) {
            let good = state.list.find(v => v.id === id)
            good.cartCount += 1
        }
    }
}