import {Redirect}  from 'umi'
import { connect } from 'dva'

export default connect(state => ({
    isLogin: !!state.user.token
}))(function(props) {
    if (!props.isLogin) {
        return <Redirect to='/login' />
    }
    return (
        <div>
            <div>Private page - routes/privateRoute</div>
            {props.children}
        </div>
    )
})