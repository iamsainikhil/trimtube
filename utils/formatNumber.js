/**
 * @param {Number} value
 */
const formatNumber = (value) => {
  if (value.length <= 3) return value

  if (value.length > 3 && value.length < 7) {
    return `${Math.round(Number(value) / 10 ** 3)}K`
  } else if (value.length >= 7 && value.length < 9) {
    return `${Math.round(Number(value) / 10 ** 6)}M`
  } else {
    return `${Math.round(Number(value) / 10 ** 7)}B`
  }
}

export default formatNumber
