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
    <section className="pl-16">
      <div>
        <h1 className="text-slate-800 font-serif underline">
          {u.username}
          <span className="inline-block ml-6">
            <em>added blogs</em>
          </span>
        </h1>
      </div>
      <div>
        <ol className="font-bold text-2xl">
          {u.blogs.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default UserDetail
