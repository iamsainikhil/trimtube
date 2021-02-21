import {useContext, useEffect} from 'react'
import {ToastContainer, toast, Slide} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {ToastContext} from '../context/ToastContext'
import styles from '../styles/toastify.module.scss'
import {trackGAEvent} from '../utils/googleAnalytics'

const Toast = () => {
  const {show, message, setShow} = useContext(ToastContext)

  useEffect(() => {
    if (show) {
      toast.dark(message, {
        className: `${styles.toastContainer}`,
        progressClassName: `${styles.progressBar}`,
        onOpen: () => {
          trackGAEvent('toasts', message, 'onOpen toast')
        },
        onClose: () => {
          setShow(false)
        },
      })
    }
    return () => {}
  }, [show, message])

  return (
    <ToastContainer
      position='bottom-left'
      autoClose={3000}
      closeOnClick
      newestOnTop
      pauseOnHover
      hideProgressBar={false}
      transition={Slide}
      draggable
      role='alert'
    />
  )
}

export default Toast
