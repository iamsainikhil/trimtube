import '../styles/globals.scss'
import '../styles/header.scss'
import {ThemeProvider} from 'theme-ui'
import theme from '../utils/theme'
import {ToastContextProvider} from '../context/ToastContext'
import Toast from './../components/Toast'
import {initGA, trackGAEvent} from '../utils/googleAnalytics'

// for more info on measuring app performance
// visit https://nextjs.org/docs/advanced-features/measuring-performance
export function reportWebVitals(metric) {
  /* Google Analytics */
  const {id, name, label, value} = metric
  initGA()
  trackGAEvent(
    'Web Vitals',
    'NextJS Custom Metric',
    name,
    Math.round(name === 'CLS' ? value * 1000 : value)
  )
}

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
