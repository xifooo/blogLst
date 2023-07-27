// import { useState } from "react"
// import PropTypes from "prop-types"

// export const useTogglable = (props) => {
//   const [visible, setVisible] = useState(false)

//   const hideWhenVisible = { display: visible ? "none" : "" }
//   const showWhenVisible = { display: visible ? "" : "none" }

//   const toggleVisibility = () => {
//     setVisible(!visible)
//   }

//   return (
//     <div>
//       <div style={hideWhenVisible}>
//         <button onClick={toggleVisibility}>{props.buttonLabel}</button>
//       </div>
//       <div style={showWhenVisible}>
//         {props.children}
//         <button onClick={toggleVisibility}>cancel</button>
//       </div>
//     </div>
//   )
// }
import { useState } from "react"

const useTogglable = (initialValue = false) => {
  const [visible, setVisible] = useState(initialValue)

  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return {
    visible,
    toggleVisibility,
    hideWhenVisible,
    showWhenVisible,
  }
}

export default useTogglable
