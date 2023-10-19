import PropTypes from 'prop-types'
const Notification = ({ notiColor, message }) => {
  return (
    <div
      style={{ color: `${notiColor}`, textTransform: 'uppercase', fontWeight: 'bold', padding: 5, }}
    >
      {message}
    </div>
  )
}

Notification.propTypes = {
  notiColor: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
}

export default Notification