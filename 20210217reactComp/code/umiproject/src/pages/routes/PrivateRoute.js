import {Redirect}  from 'umi'

export default function(props) {
    console.log('dafafa')
    if (Math.random() > .5) {
        return <Redirect to='/login' />
    }
    return (
        <div>
            <div>Private page - routes/privateRoute</div>
            {props.children}
        </div>
    )
}