import Notification from './Notification'
import PropTypes from 'prop-types'

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
      <Notification notiColor={notiColor} message={notiMessage} />
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

LoginForm.propTypes = {
  notiColor: PropTypes.string.isRequired,
  notiMessage:PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
  username:PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired
}

export default LoginForm