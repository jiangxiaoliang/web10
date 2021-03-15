import { Link } from 'umi'

export default function({history}) {
    const users = [
        { id: 1, name: 'tom' },
        { id: 2, name: 'jerry' }
    ]
    return (
        <div>
            <h1>userIndex page</h1>
            <ul>
                {
                    users.map(user => (
                        // <li key={user.id}>
                        //     <Link to={`/users/${user.id}`}>{user.name}</Link>
                        // </li>
                        <li key={user.id} onClick={() => history.push(`/users/${user.id}`)}>{user.name}</li>
                    ))
                }
            </ul>
        </div>
    )
}