import '../styles/globals.scss'
import '../styles/header.scss'
// import {ThemeProvider} from 'theme-ui'
import {ChakraProvider, theme} from '@chakra-ui/react'
import THEME from '../utils/theme'
import {ToastContextProvider} from '../context/ToastContext'
import Toast from './../components/Toast'
import {trackGAEvent} from '../utils/googleAnalytics'
import {DynamicColorMode} from '../utils/dynamic-color-mode'

// for more info on measuring app performance
// visit https://nextjs.org/docs/advanced-features/measuring-performance
export function reportWebVitals(metric) {
  /* Google Analytics */
  const {id, name, label, value} = metric
  trackGAEvent(
    'Web Vitals',
    'NextJS Custom Metric',
    name,
    Math.round(name === 'CLS' ? value * 1000 : value)
  )
}

const customTheme = {
  ...theme,
  ...THEME,
}

export default function MyApp({Component, pageProps}) {
  return (
    <ChakraProvider theme={customTheme}>
      <DynamicColorMode>
        <ToastContextProvider>
          <Component {...pageProps} />
          <Toast />
        </ToastContextProvider>
      </DynamicColorMode>
    </ChakraProvider>
  )
}
