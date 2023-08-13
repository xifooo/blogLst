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
    <div className="ml-16">
      <table className="table-auto">
        <thead>
          <tr>
            <th>Users</th>
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
