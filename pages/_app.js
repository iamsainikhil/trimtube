import '../styles/globals.scss'
import '../styles/header.scss'
import {ThemeProvider} from 'theme-ui'
import theme from '../utils/theme'

export default function MyApp({Component, pageProps}) {
  return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
  )
}
