import '../styles/globals.scss'
import '../styles/header.scss'
import {ThemeProvider} from 'theme-ui'
import theme from '../utils/theme'
import {ToastContextProvider} from '../context/ToastContext'
import Toast from './../components/Toast'

export default function MyApp({Component, pageProps}) {
  return (
    <ThemeProvider theme={theme}>
      <ToastContextProvider>
        <Component {...pageProps} />
        <Toast />
      </ToastContextProvider>
    </ThemeProvider>
  )
}
