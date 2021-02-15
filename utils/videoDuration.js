// PT0H4M54S
const YOUTUBE_TIME_RE = /PT(?:(\d*)H)?(?:(\d*)M)?(?:(\d*)S)?/
const YOUTUBE_TIME_UNITS = {
  H: 3600,
  M: 60,
  S: 1,
}

const getDuration = (videoInfo) => {
  let duration = {
    minutes: 0,
    seconds: 0,
  }
  if (videoInfo && videoInfo.items) {
    const match = YOUTUBE_TIME_RE.exec(
      videoInfo.items[0].contentDetails.duration
    ) // [timestamp,H,M,S]
    //console.log(match[1], match[2], match[3])
    const minutes = match[2] ? Number(match[2]) : 0

    duration.minutes = match[1] ? Number(match[1]) * 60 + minutes : 0 + minutes
    duration.seconds = Number(match[3]) || 0

    return duration
  }
  return duration
}

export default getDuration
