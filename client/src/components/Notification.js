import PropType from "prop-types"

const Notification = ({ message }) => {
  if (message === null) {
    return null
  } else {
    return <div className="error"> {message} </div>
  }
}
Notification.propTypes = {
  message: PropType.object.isRequired
}

export default Notification