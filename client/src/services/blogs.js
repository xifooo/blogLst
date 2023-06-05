import axios from "axios"

const bashUrl = "http://localhost:3003/api/blogs"

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const config = {
    headers: { "Authorization": token }
  }
  const res = axios.get(bashUrl, config)
  return res.then(returnedBlogs => returnedBlogs.data)
}

const create = async (newObject) => {
  const config = {
    headers: { "Authorization": token }
  }
  const res = await axios.post(bashUrl, newObject, config)
  return res.data
}


export default { getAll, create, setToken }