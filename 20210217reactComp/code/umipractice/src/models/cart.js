export default {
    namespace: 'cart',
    state: JSON.parse(localStorage.getItem('cart')) || [],
    effects: {
        *addCart({ payload }, { put, select }) {
            yield put({
                type: 'add',
                payload
            })
            const cart = yield select(state => state.cart)
            localStorage.setItem('cart', JSON.stringify(cart))
        }
    },
    reducers: {
        add(cart, action) {
            const good = action.payload
            const index = cart.findIndex(v => v.id == good.id)
            if (index > -1) {
                const cartCopy  = [...cart]
                const itemCopy = { ...cartCopy[index] }
                itemCopy.count += 1
                cartCopy.splice(index, 1, itemCopy)
                return cartCopy
            } else {
                return [...cart, { ...good, count: 1 }]
            }
        }
    }
}