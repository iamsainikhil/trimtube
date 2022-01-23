import React, {useState, useEffect} from 'react'
import YouTube from 'react-youtube'
import {trackGAEvent} from '../utils/googleAnalytics'

const Player = ({
  videoId,
  videoNumber,
  start,
  end,
  loopStatus,
  updateVideoNumber,
}) => {
  const getOptions = () => ({
    height: '360',
    width: '680',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      loop: 1,
      controls: 1,
      modestbranding: 1,
      rel: 0,
      start: Number(start) || 0,
      end: Number(end) || 0,
      iv_load_policy: 3,
      // color: 'white',
      // playlist: videoId,
      playsinline: 1,
    },
  })
  const [opts, setOpts] = useState(getOptions())
  const [playerEvent, setPlayerEvent] = useState(null)

  const startVideo = (event) => {
    // autoplay doesn't work on mobile devices unless muted
    event.target.mute()
    event.target.setVolume(100)
    event.target.seekTo(start, true)
    event.target.playVideo()
  }

  const updateStatus = (event) => {
    if (loopStatus === 'LOOP_VIDEO') {
      startVideo(event)
    } else {
      videoNumber ? updateVideoNumber(videoNumber++) : startVideo(event)
    }
  }

  const _onReady = (event) => {
    // access to player in all event handlers via event.target
    // console.log(event.target.h.outerHTML, opts.playerVars)
    setPlayerEvent(event)
    trackGAEvent('player', `loaded player for ${videoId}`, 'player ready')
    startVideo(event)
  }

  const _onStateChange = (event) => {
    // video unstarted or stopped
    if (event.data === -1) {
      startVideo(event)
    } else if (event.data === 0) {
      updateStatus(event)
    } else {
      const currentTime = event.target.getCurrentTime()
      // fix the iframe issue playing video from the beginning
      // even though start time is different
      if (start > 2 && currentTime < 2) {
        startVideo(event)
      }
    }
    setPlayerEvent(event)
  }

  const _onError = (event) => {
    console.error(event.data)
  }

  useEffect(() => {
    setOpts(getOptions())
    if (playerEvent) {
      startVideo(playerEvent)
    }
    return () => {}
  }, [start, end])

  return (
    <div>
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={_onReady}
        onStateChange={_onStateChange}
        onError={_onError}
      />
    </div>
  )
}

export default Player
