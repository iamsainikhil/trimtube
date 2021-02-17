const getMinutes = (time) => {
  const number = Number(time)
  if (!time) return number
  if (number < 60) return 0
  if (number >= 60) {
    return (number - (number % 60)) / 60
  }
}

const getSeconds = (time) => {
  const number = Number(time)
  if (!time || number < 60) return number
  if (number >= 60) {
    return number % 60
  }
}

const formatTime = (time, type) => {
  if (type === 'Minutes') {
    return getMinutes(time)
  } else if (type === 'Seconds') {
    return getSeconds(time)
  } else {
    return `${getMinutes(time)}:${getSeconds(time)}`
  }
}

export default formatTime
