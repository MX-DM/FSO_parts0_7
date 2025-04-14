
const User = ({ user }) => {
    if (!user) return <p>Loading user...</p>

    return(
        <div>
            <h1>{user.name}</h1>
            <h2>Created blogs:</h2>
            <ul>
                {user.blogs.map(b => <li key={b.id}>{b.title} By {b.author}</li>)}
            </ul>
        </div>
    )
}

export default User
