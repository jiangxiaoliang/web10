export default function({ redirect, store }) {
    console.log('token ' + store.state.user.token)
    if (!store.state.user.token) {
        redirect('/login')
    }
}