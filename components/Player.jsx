import {Fragment} from 'react'
import YouTube from 'react-youtube'

const Player = () => {
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      loop: 1,
      controls: 1,
      modestbranding: 1,
      start: 5,
      end: 110,
      //   playlist: 'JOPFpsVwAS4',
    },
  }

  const _onReady = (event) => {
    // access to player in all event handlers via event.target
    console.log(event.target.h.outerHTML, opts.playerVars)
  }

  const _onStateChange = (event) => {
    if (event.data === -1 || event.data === 0) {
      event.target.seekTo(opts.playerVars.start, true)
      event.target.playVideo()
    }
  }

  const _onError = (event) => {
    console.log(event.data)
  }

  return (
    <Fragment>
      <YouTube
        videoId='JOPFpsVwAS4'
        opts={opts}
        onReady={_onReady}
        onStateChange={_onStateChange}
        onError={_onError}
      />
    </Fragment>
  )
}

export default Player
