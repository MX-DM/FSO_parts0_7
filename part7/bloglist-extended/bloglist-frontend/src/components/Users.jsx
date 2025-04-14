import { Link } from 'react-router-dom'

const Users = ({ users }) => {
    return(
        <table>
            <tbody>
                <tr>
                    <th>Name</th>
                    <th>Blogs Created</th>
                </tr>
                {users.map((u,i) =>
                    <tr key={i}>
                        <td>
                            <Link to={`/users/${u.id}`}>{u.name}</Link>
                        </td>
                        <td>{u.blogs.length}</td>
                    </tr>)}
            </tbody>
        </table>
    )
}

export default Users
