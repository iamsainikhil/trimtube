import React, {useState, useEffect} from 'react'
const ToastContext = React.createContext({
  show: false,
  message: '',
})

const ToastContextProvider = ({children}) => {
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState('')

  return (
    <ToastContext.Provider value={{show, message, setShow, setMessage}}>
      {children}
    </ToastContext.Provider>
  )
}

export {ToastContext, ToastContextProvider}
