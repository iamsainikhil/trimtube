/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from 'theme-ui'
import {Fragment, useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import Player from '../components/Player'
import Info from '../components/Info'
import axios from 'axios'
import TrimControls from '../components/TrimControls'
import Alert from '../components/Alert'
import Layout from '../components/Layout'
import siteUrl from './../utils/siteUrl'
import Button from './../components/Button'

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

  const trimVideo = ({start, end}) => {
    setStart(start)
    setEnd(end)
    router.push({
      pathname: '/video',
      query: {id: videoId, start, end},
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
          <p style={{textAlign: 'center'}}>
            <Button
              primary={{bg: 'muted', color: 'text'}}
              hover={{bg: 'shade1', color: 'accent'}}
              action={toggleControls}>
              {showControls ? 'Hide Trim Controls' : 'Trim Video'}
            </Button>
          </p>
          {showControls && (
            <TrimControls start={start} end={end} onTrim={trimVideo} />
          )}
        </Fragment>
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
