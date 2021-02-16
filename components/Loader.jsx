import loaderStyles from '../styles/loader.module.scss'

const Loader = () => {
  return (
    <div className={loaderStyles.spinner}>
      <div className={loaderStyles.doubleBounce1}></div>
      <div className={loaderStyles.doubleBounce2}></div>
    </div>
  )
}

export default Loader
