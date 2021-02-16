import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

const relativeTimeString = (timestamp) => {
  const date = dayjs(timestamp).format('YYYY-MM-DD')
  return `${dayjs(date).toNow(true)} ago`
}

export default relativeTimeString
