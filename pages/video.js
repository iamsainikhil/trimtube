/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from 'theme-ui'
import {Fragment, useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import Image from 'next/image'
import axios from 'axios'
import Player from '../components/Player'
import Info from '../components/Info'
import TrimControls from '../components/TrimControls'
import Alert from '../components/Alert'
import Layout from '../components/Layout'
import Button from './../components/Button'
import siteUrl from './../utils/siteUrl'
import formatTime from './../utils/formatTime'

export default function Video({videoData, videoTitle, videoImage, error}) {
  const router = useRouter()
  const {query} = router
  const [data, setData] = useState(videoData)
  const [title, setTitle] = useState(videoTitle)
  const [image, setImage] = useState(videoImage)
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(null)
  const [showControls, setShowControls] = useState(false)
  const [playlistVideos, setPlaylistVideos] = useState([])
  const videoId = query.id

  const toggleControls = () => {
    setShowControls(!showControls)
  }

  const updateRouter = (id, start, end) => {
    setShowControls(false)
    router.push({
      pathname: '/video',
      query: {id, start, end, playlist: query.playlist},
    })
  }

  useEffect(() => {
    setStart(query.start ? Number(query.start) : null)
    setEnd(query.end ? Number(query.end) : null)
    return () => {}
  }, [query.start, query.end])

  useEffect(() => {
    if (query.playlist && localStorage.getItem('playlists')) {
      const playlists = JSON.parse(localStorage.getItem('playlists'))
      if (playlists[query.playlist]) {
        const {videos} = playlists[query.playlist]
        setPlaylistVideos(videos)
        const [video] = videos.filter(({id}) => id === videoId)
        if (video) {
          const {thumbnails, title} = video.snippet
          const image = thumbnails['standard']
            ? thumbnails.standard.url
            : thumbnails.high.url
          setData(video)
          setTitle(title)
          setImage(image)
        }
      }
    }
    return () => {}
  }, [query.playlist])

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
          bg: 'background',
          mt: 2,
          '@media (min-width: 80rem)': {
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
          <Player videoId={videoId} start={start} end={end} />
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
                onTrim={() => updateRouter(videoId, start, end)}
              />
            )}
          </Fragment>
        </div>
        {playlistVideos && (
          <div
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
              mx: 2,
              p: 2,
              height: '100%',
              overflowY: 'auto',
              border: '1px solid gray',
              borderRadius: '15px',
              '@media (max-width: 80rem)': {
                my: 5,
                mx: 'auto',
              },
            }}>
            {playlistVideos.map(({id, snippet, start, end}) => (
              <div
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  my: 1,
                  width: '100%',
                  borderRadius: '15px',
                  bg: id === videoId ? 'muted' : 'background',
                  '&:hover': {
                    bg: 'muted',
                    cursor: 'pointer',
                  },
                  '@media (max-width: 80rem)': {
                    alignItems: 'center',
                  },
                }}
                onClick={() => updateRouter(id, start, end)}
                key={id}>
                <Image
                  src={snippet.thumbnails.medium.url}
                  alt={snippet.title}
                  title={snippet.title}
                  layout='intrinsic'
                  width='160'
                  height='120'
                  className='video-list-thumbnail'
                />
                <div
                  sx={{
                    p: 2,
                    lineHeight: 1.25,
                    fontSize: [0, 1],
                    color: 'gray',
                  }}>
                  <p
                    sx={{
                      fontWeight: 600,
                    }}>
                    {snippet.title}
                  </p>
                  <p>{snippet.channelTitle}</p>
                  <p sx={{color: 'text'}}>
                    Start:{' '}
                    <span sx={{color: 'secondary'}}>
                      {formatTime(start, 'Both')}
                    </span>
                    &nbsp;&nbsp; End:{' '}
                    <span sx={{color: 'secondary'}}>
                      {formatTime(end, 'Both')}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
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
