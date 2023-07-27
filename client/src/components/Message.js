import { useSelector } from "react-redux"

const Message = () => {
  const message = useSelector((state) => state.message)
  if (message === null) {
    return null
  } else {
    return <div className="error">{message}</div>
  }
}

export default Message