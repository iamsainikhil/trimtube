/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from 'theme-ui'
import dynamic from 'next/dynamic'
import Lottie from 'react-lottie'
import Loader from '../components/Loader'
import animationData from '../public/404_animation.json'
const Layout = dynamic(() => import('../components/Layout'), {
  loading: Loader,
})

export default function Custom404() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid meet',
    },
  }

  return (
    <Layout title='Page Not Found' page='404'>
      <div
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          marginTop: '-2rem',
          height: '100%',
          zIndex: 10,
        }}>
        <Lottie options={defaultOptions} />
      </div>
    </Layout>
  )
}
