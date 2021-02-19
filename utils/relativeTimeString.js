import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

/**
 * find relative time
 * @param {Date} timestamp (ISO String) ex - 2015-05-01T13:37:58Z
 * @returns {String}
 */
const relativeTimeString = (timestamp) => {
  const date = dayjs(timestamp).format('YYYY-MM-DD')
  return `${dayjs(date).toNow(true)} ago`
}

export default relativeTimeString
