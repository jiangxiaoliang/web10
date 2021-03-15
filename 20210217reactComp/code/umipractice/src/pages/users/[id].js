export default function({ match }) {
    return (
        <div>
            <h1>users page / {match.params.id}</h1>
        </div>
    )
}