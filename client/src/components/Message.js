import { useSelector } from "react-redux"

const Message = () => {
  const message = useSelector((state) => state.message)
  if (message === null) {
    return <div className="invisible h-16"></div>
  } else {
    return (
      // <div className="w-3/4 h-20 bg-pink-300 flex justify-center items-start">
      //   <p className="text-white font-bold p-2 text-xl">{message}</p>
      // </div>
      <div className="h-16 border-b flex items-center">
        <p className="text-black px-6 line-clamp-3 hyphens-manual break-all whitespace-pre-line">
          {message}
        </p>
      </div>
    )
  }
}

export default Message
