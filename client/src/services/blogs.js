import axios from "axios"

const bashUrl = "http://localhost:3003/api/blogs"

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { "Authorization": token }
  }
  const res = axios.get(bashUrl, config)
  const returnedBlogs = await res
  return returnedBlogs.data
}

const create = async (newObject) => {
  const config = {
    headers: { "Authorization": token }
  }
  const res = await axios.post(bashUrl, newObject, config)
  return res.data
}

const update = async (id, blogObj) => {
  const config = {
    headers: { "Authorization": token }
  }
  const res = await axios.put(`${bashUrl}/${id}`, blogObj, config)
  return res.data
}

const remove = async id => {
  const config = {
    headers: { "Authorization": token }
  }
  await axios.delete(`${bashUrl}/${id}`, config)
}


export default { getAll, create, update, remove, setToken }
