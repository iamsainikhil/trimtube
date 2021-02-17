import {useContext, useEffect} from 'react'
import {ToastContainer, toast, Slide} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {ToastContext} from '../context/ToastContext'

const Toast = () => {
  const {show, message, setShow} = useContext(ToastContext)

  useEffect(() => {
    if (show) {
      toast.info(message, {
        onClose: () => {
          setShow(false)
        },
      })
    }
    return () => {}
  }, [show, message])

  return (
    <ToastContainer
      autoClose={2000}
      closeOnClick
      newestOnTop
      pauseOnHover
      transition={Slide}
      draggable
      role='alert'
    />
  )
}

export default Toast
