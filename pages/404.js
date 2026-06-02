/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from 'theme-ui'
import dynamic from 'next/dynamic'
import Loader from '../components/Loader'
import animationData from '../public/404_animation.json'
const Layout = dynamic(() => import('../components/Layout'), {
  loading: Loader,
})
const Lottie = dynamic(() => import('react-lottie'), {
  ssr: false,
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
      <Lottie options={defaultOptions} />
    </Layout>
  )
}
