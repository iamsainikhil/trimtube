/**
 * shuffle an array randomly
 * @param {Array} arr
 * @returns {Array} newArr
 */
export const shuffle = (arr) => {
  const newArr = arr.slice()
  for (let i = newArr.length - 1; i > 0; i--) {
    const random = Math.floor(Math.random() * (i + 1))
    ;[newArr[i], newArr[random]] = [newArr[random], newArr[i]]
  }
  return newArr
}
