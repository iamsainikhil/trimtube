import '../styles/globals.scss'
import '../styles/header.scss'
import {useEffect} from 'react'
import {ThemeUIProvider} from 'theme-ui'
import theme from '../utils/theme'
import {trackGAEvent} from '../utils/googleAnalytics'
import {dateNow} from './../utils/date'
import {ToastContextProvider} from '../context/ToastContext'
import Toast from './../components/Toast'
import ErrorBoundary from '../components/ErrorBoundary'
import demoPlaylist from '../constants/demoPlaylist'

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

export default function MyApp({Component, pageProps}) {
  useEffect(() => {
    if (!localStorage.getItem('playlists')) {
      // load the demo playlist
      const playlists = {
        Demo: {
          ...demoPlaylist,
          created: dateNow(),
        },
      }
      localStorage.setItem('playlists', JSON.stringify(playlists))
    }
    return () => {}
  }, [])

  return (
    <ThemeUIProvider theme={theme}>
      <ErrorBoundary>
        <ToastContextProvider>
          <Component {...pageProps} />
          <Toast />
        </ToastContextProvider>
      </ErrorBoundary>
    </ThemeUIProvider>
  )
}
