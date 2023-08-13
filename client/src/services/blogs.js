import axios from "axios"

const baseUrl = "http://localhost:3003/api/blogs"

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }
  const returnedBlogs = await axios.get(baseUrl, config)
  return returnedBlogs.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const res = await axios.post(baseUrl, newObject, config)
  return res.data
}

const update = async (id, blogObj) => {
  const config = {
    headers: { Authorization: token },
  }
  const res = await axios.put(`${baseUrl}/${id}`, blogObj, config)
  return res.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}

const getComments = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const res = await axios.get(`${baseUrl}/${id}/comments`, config)
  return res.data
}

const createComment = async (id, comment) => {
  const config = {
    headers: { Authorization: token },
  }
  const res = await axios.post(`${baseUrl}/${id}/comments`, comment, config)
  return res.data
}

export default {
  getAll,
  create,
  update,
  remove,
  setToken,
  getComments,
  createComment,
}
export { token, baseUrl }
