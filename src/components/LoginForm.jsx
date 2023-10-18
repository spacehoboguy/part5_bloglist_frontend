import Notification from "./Notification"

const LoginForm = (
  notiColor,
  notiMessage,
  handleLogin,
  username,
  setUsername,
  password,
  setPassword
) => {
    return (
        <div>
        <Notification notiColor={notiColor} message={notiMessage}/>
        <form onSubmit={handleLogin}>
          <div>Username:
            <input
              type="text"
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>Password:
            <input
              type="password"
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
}

export default LoginForm