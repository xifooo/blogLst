import axios from "axios"

const bashUrl = "http://localhost:3003/api/login"

const login = async (credentials) => {
  const res = await axios.post(bashUrl, credentials)
  // window.localStorage.setItem("tokenExpiresIn", JSON.stringify(res.headers["expiresIn"]))
  const user = res.data
  user["tokenExpiresIn"] = res.headers["expiresIn"]
  return user
}

export default { login }
