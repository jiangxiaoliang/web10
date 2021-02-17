import React from 'react'

function Welcome1(props) {
    return (
        <div>
            welcome1, {props.name} - {props.age}
        </div>
    )
}

class Welcome2 extends React.Component {
    render() {
        return (
            <div>
                welcome2, {this.props.name} - {this.props.age}
            </div>
        )
    }
}

export default function CompType() {
    return (
        <div>
            <Welcome1 name="tom" age="20"></Welcome1>
            <Welcome2 name="jerry" age="21"></Welcome2>
        </div>
    )
}