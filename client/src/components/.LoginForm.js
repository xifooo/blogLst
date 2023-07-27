import { useState } from "react"
import PropTypes from "prop-types"

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

LoginForm.propTypes = {
  loginToAccount: PropTypes.func.isRequired,
}

export default LoginForm
