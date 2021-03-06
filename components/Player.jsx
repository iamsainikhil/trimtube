import YouTube from 'react-youtube'
import {trackGAEvent} from '../utils/googleAnalytics'

const Player = ({videoId, start, end}) => {
  const opts = {
    height: '400',
    width: '720',
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
      color: 'white',
      // playlist: videoId,
      playsinline: 1,
    },
  }

  const _onReady = (event) => {
    // access to player in all event handlers via event.target
    // console.log(event.target.h.outerHTML, opts.playerVars)
    trackGAEvent('player', `loaded player for ${videoId}`, 'player ready')
    event.target.playVideo()
  }

  const _onStateChange = (event) => {
    if (event.data === -1 || event.data === 0) {
      event.target.seekTo(opts.playerVars.start, true)
      event.target.playVideo()
    }
  }

  const _onError = (event) => {
    console.error(event.data)
  }

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
