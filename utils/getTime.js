const getTime = (minutes, seconds) => {
  return (isNaN(minutes) ? 0 : minutes * 60) + (isNaN(seconds) ? 0 : seconds)
}

export default getTime
