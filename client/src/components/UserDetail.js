import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

const UserDetail = () => {
  const paramId = useParams().id
  const u = useSelector(
    (state) => state.user.allUsers.filter((u) => u.id === paramId)[0]
  )
  if (!u) {
    return null
  }

  return (
    <div>
      <h1>{u.username}</h1>
      <p>
        <strong>added blogs</strong>
      </p>
      <ul>
        {u.blogs.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserDetail
