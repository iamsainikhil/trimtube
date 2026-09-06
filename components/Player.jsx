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
  const isIOS = () => {
    if (typeof navigator === 'undefined') {
      return false
    }
    return (
      /iPad|iPhone|iPod/.test(navigator.platform) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    )
  }

  // True once the user has interacted with this page session (client-side
  // navigation from Search/Playlists keeps the same document, so their
  // earlier gesture is sticky activation on iOS 17+).
  const hasUserActivation = () => {
    return (
      typeof navigator !== 'undefined' &&
      navigator.userActivation &&
      navigator.userActivation.hasBeenActive
    )
  }

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
      mute: isIOS() ? 1 : 0, // Muted autoplay is required on iOS devices
      controls: 1, // Show pause/play buttons in player
      showinfo: 1, // Hide the video title
      modestbranding: 1, // Hide the Youtube Logo
      rel: 0, // Show related videos only from the video owner
      loop: 1, // Run the video in a loop
      fs: 1, // show the fullscreen icon
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

  // On iOS the video is kept muted so autoplay is always permitted. Once the
  // user has interacted with this document, sticky activation (iOS 17+)
  // lets us restore the audio immediately — no extra tap needed. On a cold
  // page load the first real gesture unlocks the sound in the same handler.
  const unlockAudio = (player) => {
    if (!isIOS()) {
      return
    }
    const unmute = () => {
      player.unMute()
      document.removeEventListener('pointerdown', unmute)
      document.removeEventListener('touchend', unmute)
    }
    // sticky activation: audio autoplay is already blessed for this document
    if (hasUserActivation()) {
      unmute()
      return
    }
    // cold load: eager listeners unlock audio the moment the user gestures,
    // while the video itself keeps autoplaying muted in the meantime
    document.addEventListener('pointerdown', unmute)
    document.addEventListener('touchend', unmute)
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
    unlockAudio(event.target)
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
