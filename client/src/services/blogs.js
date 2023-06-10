import axios from "axios"
import { config } from "dotenv"

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

const put = async blogObj => {
  const config = {
    headers: { "Authorization": token }
  }
  const res = await axios.put(bashUrl, blogObj, config)
  return res.data
}

const remove = async blogId => {
  const config = {
    headers: { "Authorization": token }
  }
  await axios.delete(bashUrl, blogId, config)
}


export default { getAll, create, put, remove, setToken }