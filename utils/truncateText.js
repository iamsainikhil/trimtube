/**
 * Truncate the excerpt text based on character count
 * @param {String} text
 */
const truncateText = (text, count) => {
  if (text.length > count) {
    return text.slice(0, count).concat('...')
  }
  return text
}

export default truncateText
