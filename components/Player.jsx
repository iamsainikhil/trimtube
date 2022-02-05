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
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      start: Number(start) || 0,
      end: Number(end) || 0,
      // color: 'white',
      // playlist: videoId,
      playsinline: 1,
      autoplay: 1, // Auto-play the video on load
      controls: 1, // Show pause/play buttons in player
      showinfo: 1, // Hide the video title
      modestbranding: 1, // Hide the Youtube Logo
      rel: 0, // Show related videos only from the video owner
      loop: 1, // Run the video in a loop
      fs: 0, // Hide the full screen button
      cc_load_policy: 0, // Hide closed captions
      iv_load_policy: 3, // Hide the Video Annotations
      autohide: 1, // Hide video controls when playing
      playsinline: 1, //forbid fullscreen on ios
    },
  })
  const [opts, setOpts] = useState(getOptions())
  const [playerEvent, setPlayerEvent] = useState(null)

  const startVideo = (event) => {
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
    <YouTube
      videoId={videoId}
      opts={opts}
      onReady={_onReady}
      onStateChange={_onStateChange}
      onError={_onError}
    />
  )
}

export default Player
