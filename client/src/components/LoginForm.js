import { useState } from "react"

const LoginForm = ({ loginToAccount }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e) => {
    try {
      e.preventDefault()
      loginToAccount({ username, password })
    } catch (exception) {
      window.alert(`Wrong occupying ::: ${exception}`)
    }
  }
  return (
    <form onSubmit={handleLogin}>
      <label>
        username:
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </label>
      <br />
      <label>
        password:
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </label>
      <br />
      <button type="submit"> Login </button>
    </form>
  )
}


export default LoginForm