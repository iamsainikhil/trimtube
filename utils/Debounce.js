const debounce = (fn, time = 250) => {
  let interval
  return (...args) => {
    const later = () => {
      interval = null
      fn.apply(this, args)
    }
    clearTimeout(interval)
    interval = setTimeout(later, time)
  }
}
export default debounce
