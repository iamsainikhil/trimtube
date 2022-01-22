/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from 'theme-ui'
import {Fragment, useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import axios from 'axios'
import Player from '../components/Player'
import Info from '../components/Info'
import TrimControls from '../components/TrimControls'
import Alert from '../components/Alert'
import Layout from '../components/Layout'
import Button from './../components/Button'
import Playlistvideos from '../components/PlaylistVideos'
import siteUrl from './../utils/siteUrl'
import {shuffle as shuffleVideos} from './../utils/shuffle'

export default function Video({videoData, videoTitle, videoImage, error}) {
  const router = useRouter()
  const {query} = router
  const [data, setData] = useState(videoData)
  const [title, setTitle] = useState(videoTitle)
  const [image, setImage] = useState(videoImage)
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(null)
  const [showControls, setShowControls] = useState(false)
  const [loopStatus, setLoopStatus] = useState('LOOP_VIDEO')
  const [shuffle, setShuffle] = useState(false)
  const [playlistVideos, setPlaylistVideos] = useState([])
  const videoId = query.id

  const toggleControls = () => {
    setShowControls(!showControls)
  }

  const getPlaylists = () => {
    if (query.playlist && localStorage.getItem('playlists')) {
      const playlists = JSON.parse(localStorage.getItem('playlists'))
      if (playlists[query.playlist]) {
        const {videos} = playlists[query.playlist]
        return videos
      }
    }
    return []
  }

  const updateRouter = ({
    id,
    start: startTime,
    end: endTime,
    loopValue,
    shuffleValue,
  }) => {
    const playlistParam = query.playlist ? {playlist: query.playlist} : {}
    router.push({
      pathname: '/video',
      query: {
        id: id,
        start: startTime,
        end: endTime,
        ...playlistParam,
        loop: loopValue || query.loop || 'video',
        shuffle: shuffleValue || query.shuffle || 'off',
      },
    })
  }

  const getVideoNumber = () => {
    let videoNumber = 1
    for (let i = 0; i < playlistVideos.length; i++) {
      const {id, start: startTime, end: endTime} = playlistVideos[i]
      if (
        id === videoId &&
        Number(startTime) === start &&
        Number(endTime) === end
      ) {
        return videoNumber
      }
      videoNumber++
    }
  }

  const updateVideoProps = (video) => {
    const {thumbnails, title} = video.snippet
    const image = thumbnails['standard']
      ? thumbnails.standard.url
      : thumbnails.high.url
    setData(video)
    setTitle(title)
    setImage(image)
  }

  const updateVideo = (newVideoNumber) => {
    if (loopStatus === 'LOOP_PLAYLIST') {
      if (newVideoNumber >= playlistVideos.length) {
        const {id, start, end} = playlistVideos[0]
        updateRouter({id, start, end, loopValue: 'playlist'})
      } else {
        const {id, start, end} = playlistVideos[newVideoNumber]
        updateRouter({id, start, end, loopValue: 'playlist'})
      }
    } else {
      if (playlistVideos[newVideoNumber]) {
        const {id, start, end} = playlistVideos[newVideoNumber]
        updateRouter({id, start, end, loopValue: 'off'})
      }
    }
  }

  const updateLoopStatus = (status) => {
    setLoopStatus(status)
    updateRouter({id: videoId, start, end, loopValue: status})
  }

  const shufflePlaylist = (status) => {
    setShuffle(status)
    if (status) {
      setPlaylistVideos(shuffleVideos(playlistVideos))
    } else {
      // reset playlist videos
      setPlaylistVideos(getPlaylists())
    }
    const shuffleStatus = status ? 'on' : 'off'
    updateRouter({id: videoId, start, end, shuffleValue: shuffleStatus})
  }

  useEffect(() => {
    setShuffle(query.shuffle && query.shuffle === 'on')
    return () => {}
  }, [query.shuffle])

  useEffect(() => {
    switch (query.loop) {
      case 'playlist':
        setLoopStatus('LOOP_PLAYLIST')
        break
      case 'off':
        setLoopStatus('PLAY_PLAYLIST')
        break
      default:
        setLoopStatus('LOOP_VIDEO')
        break
    }
    return () => {}
  }, [query.loop])

  useEffect(() => {
    setStart(query.start ? Number(query.start) : null)
    setEnd(query.end ? Number(query.end) : null)
    return () => {}
  }, [query.start, query.end])

  useEffect(() => {
    let videos = []
    if (playlistVideos.length === 0 || !shuffle) {
      videos = getPlaylists()
    } else {
      // use the already existing videos
      // which might be needed if the playlist was shuffled before
      videos = playlistVideos
    }
    setPlaylistVideos(videos)
    const [video] = videos.filter(({id}) => id === videoId)
    if (video) {
      updateVideoProps(video)
    }
    return () => {}
  }, [videoId, query.playlist, query.modal])

  return (
    <Layout
      title={title}
      page='Video'
      image={image}
      description={`Watch video ${
        title ? title : ''
      } on TrimTube, a web application that also features a media player which allows the user to trim and loop any portion of a YouTube video with an ability to save it to a playlist.`}>
      <div
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          flex: '1 1 auto',
          bg: 'background',
          mt: 2,
          '@media (min-width: 79rem)': {
            flexFlow: 'row nowrap',
            alignItems: 'flex-start',
          },
        }}>
        <div
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            mx: 2,
          }}>
          <Player
            videoId={videoId}
            videoNumber={getVideoNumber()}
            start={start}
            end={end}
            loopStatus={loopStatus}
            updateVideoNumber={updateVideo}
          />
          <Fragment>
            {error && (
              <div style={{maxWidth: '900px'}}>
                <Alert
                  type='danger'
                  message={`Something went wrong in fetching the information of videoId ${
                    videoId || ''
                  }, unable to show video details and the controls to save this video to a playlist.`}
                />
              </div>
            )}
            {data && <Info data={data} start={start} end={end} />}
            {!error && (
              <p style={{textAlign: 'center'}}>
                <Button
                  primary={{bg: 'muted', color: 'text'}}
                  hover={{bg: 'shade1', color: 'accent'}}
                  action={toggleControls}>
                  {showControls ? 'Hide Trim Controls' : 'Trim Video'}
                </Button>
              </p>
            )}
            {showControls && (
              <TrimControls
                start={start}
                end={end}
                onTrim={({start, end}) =>
                  updateRouter({id: videoId, start, end})
                }
              />
            )}
          </Fragment>
        </div>
        {playlistVideos.length > 0 && (
          <Playlistvideos
            videoNumber={getVideoNumber()}
            playlistName={query.playlist}
            playlistVideos={playlistVideos}
            loopStatus={loopStatus}
            shuffle={shuffle}
            onVideoClick={updateRouter}
            onLoopClick={updateLoopStatus}
            onShuffleClick={shufflePlaylist}
            onVideoDelete={updateRouter}
          />
        )}
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const baseURL = context.req ? siteUrl() : ''
  if (!context.query.playlist && context.query.id) {
    try {
      const {data} = await axios.get('/api/video', {
        params: {id: context.query.id},
        baseURL,
      })
      const {thumbnails, title} = data.items[0].snippet
      const image = thumbnails['standard']
        ? thumbnails.standard.url
        : thumbnails.high.url
      const videoData = {
        ...data.items[0],
      }
      return {
        props: {
          videoData,
          videoTitle: title,
          videoImage: image,
        },
      }
    } catch (err) {
      return {
        props: {
          error: err.message || err,
        },
      }
    }
  }
  return {
    props: {},
  }
}
