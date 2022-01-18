/**
 * get singular or plural form of a text based on the value
 * @param {Number} value
 * @param {String} text
 * @returns {String}
 */
const pluralizeText = (value, text) => {
  if (value === 1) return `${text}`
  return `${text}s`
}

export default pluralizeText
