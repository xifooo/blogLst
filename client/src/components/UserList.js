import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const UserRow = ({ u }) => {
  return (
    <tr>
      <td>
        <Link to={`/users/${u.id}`}>{u.username}</Link>
      </td>
      <td>{u.blogs.length}</td>
    </tr>
  )
}

const UserList = () => {
  const users = useSelector((state) => state.user.allUsers)

  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th> </th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item) => (
            <UserRow key={item.id} u={item} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
