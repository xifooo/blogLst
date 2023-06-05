import axios from "axios"

const bashUrl = "http://localhost:3003/api/login"

const login = async (credentials) => {
  const res = await axios.post(bashUrl, credentials)
  return res.data
}

export default { login }