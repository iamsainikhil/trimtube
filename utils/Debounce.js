const debounce = (fn, wait) => {
  let timeout

  return function () {
    const later = () => fn.apply(this, arguments)

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export default debounce
