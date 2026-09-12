import React, {useRef, useEffect} from 'react'
import YouTubePlayer from 'youtube-player'
import {trackGAEvent} from '../utils/googleAnalytics'

const Player = ({
  videoId,
  videoNumber,
  start,
  end,
  loopStatus,
  updateVideoNumber,
}) => {
  const containerRef = useRef(null)
  const playerRef = useRef(null)
  // True while a freshly loaded cue has not started playing yet. When
  // loadVideoById reloads the SAME video id (e.g. the next trim of the same
  // song), the iframe can re-emit the previous cue's `ended` event before the
  // new trim starts playing; that stale event must not advance the playlist.
  const pendingPlayRef = useRef(false)

  // Keep the latest props readable inside the stable YT event handlers,
  // since those handlers are registered only once.
  const propsRef = useRef({
    videoId,
    videoNumber,
    start,
    end,
    loopStatus,
    updateVideoNumber,
  })
  useEffect(() => {
    propsRef.current = {
      videoId,
      videoNumber,
      start,
      end,
      loopStatus,
      updateVideoNumber,
    }
    return () => {}
  })

  const isIOSRef = useRef()

  const isIOS = () => {
    if (isIOSRef.current === undefined && typeof navigator !== 'undefined') {
      isIOSRef.current =
        /iPad|iPhone|iPod/.test(navigator.platform) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    }
    return isIOSRef.current
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

  // Reuse the same iframe/player for every video (single video element
  // pattern). Once the player is blessed with unmuted autoplay, loading
  // subsequent videos via loadVideoById keeps the sound — so auto-advancing
  // playlists don't need a manual tap on each video.
  const loadVideo = (player, id, startTime, endTime) => {
    pendingPlayRef.current = true
    const opts = {
      videoId: id,
      startSeconds: Number(startTime) || 0,
    }
    if (endTime) {
      opts.endSeconds = Number(endTime)
    }
    player.loadVideoById(opts)
  }

  const startVideo = (player, startTime) => {
    player.seekTo(startTime || 0, true)
    player.playVideo()
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

  useEffect(() => {
    if (!containerRef.current || playerRef.current) {
      return
    }

    const player = YouTubePlayer(containerRef.current, {
      height: '360',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        start: Number(start) || 0,
        end: Number(end) || 0,
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

    playerRef.current = player

    const onReady = () => {
      const {videoId: vid, start: s, end: e} = propsRef.current
      trackGAEvent('player', `loaded player for ${vid}`, 'player ready')
      loadVideo(player, vid, s, e)
      unlockAudio(player)
    }

    const onStateChange = (event) => {
      const {start: s, loopStatus: ls, videoNumber: vn, updateVideoNumber} =
        propsRef.current
      // video unstarted or stopped
      if (event.data === -1) {
        startVideo(player, s)
      } else if (event.data === 0) {
        if (ls === 'LOOP_VIDEO') {
          startVideo(player, s)
        } else if (!pendingPlayRef.current) {
          pendingPlayRef.current = true
          vn ? updateVideoNumber(vn) : startVideo(player, s)
        }
        // A stale `ended` arriving while the next cue (possibly the same video
        // id with a different trim) has not started playing yet is ignored so
        // the playlist advances only once and same-id trims don't get skipped.
      } else {
        if (event.data === 1) {
          // the freshly loaded cue is actually playing — accept a future `ended`
          pendingPlayRef.current = false
        }
        player.getCurrentTime().then((currentTime) => {
          // fix the iframe issue playing video from the beginning
          // even though start time is different
          if (s > 2 && currentTime < 2) {
            startVideo(player, s)
          }
        })
      }
    }

    const onError = (event) => {
      console.error(event.data)
    }

    const readyListener = player.on('ready', onReady)
    const stateChangeListener = player.on('stateChange', onStateChange)
    const errorListener = player.on('error', onError)

    return () => {
      player.off(readyListener)
      player.off(stateChangeListener)
      player.off(errorListener)
      player.destroy().catch(() => {})
      playerRef.current = null
    }
  }, [])

  // Load a new video into the same (audio-blessed) player instead of letting
  // the player remount — this keeps the sound when advancing through a
  // playlist in loop mode.
  useEffect(() => {
    const player = playerRef.current
    if (!player) {
      return
    }
    loadVideo(player, videoId, start, end)
    return () => {}
  }, [videoId, start, end])

  return <div ref={containerRef} />
}

export default Player
