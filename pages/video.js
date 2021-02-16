/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from 'theme-ui'
import {Fragment, useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import Player from '../components/Player'
import Info from '../components/Info'
import axios from 'axios'
import Loader from './../components/Loader'
import TrimControls from '../components/TrimControls'
import videoData from '../constants/videoData'
import Alert from '../components/Alert'
import Layout from '../components/Layout'

export default function Video() {
  const router = useRouter()
  const {query} = router
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(null)
  const [data, setData] = useState(undefined)
  const [error, setError] = useState(undefined)
  const [loading, setLoading] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const videoId = query.id || 'cLWmZpaTodg'

  const getTitle = () => {
    if (data && data.items) {
      return data.items[0].snippet.title
    }
  }

  const getVideoImage = () => {
    if (data && data.items) {
      return data.items[0].snippet.thumbnails.standard.url
    }
  }

  const fetchVideoInfo = () => {
    if (videoId) {
      setLoading(true)
      axios
        .get('/api/video', {params: {videoId}})
        .then((res) => {
          updateDataError(res.data, undefined)
        })
        .catch((error) => {
          updateDataError(undefined, error)
        })
        .finally(() => setLoading(false))
    }
    updateDataError(videoData, undefined)
  }

  const updateDataError = (data, error) => {
    setData(data)
    setError(error)
  }

  const toggleControls = () => {
    setShowControls(!showControls)
  }

  const trimVideo = ({start, end}) => {
    setStart(start)
    setEnd(end)
  }

  useEffect(() => {
    fetchVideoInfo()
    return () => {}
  }, [videoId])

  useEffect(() => {
    setStart(Number(query.start))
    setEnd(Number(query.end))
    return () => {}
  }, [query])

  return (
    <Layout title={getTitle()} page='Video' image={getVideoImage()}>
      <div
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          bg: 'background',
        }}>
        <Player videoId={videoId} start={start} end={end} />
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            {error && <Alert type='danger' message={error.message || error} />}
            {data && (
              <Fragment>
                <Info data={data} start={start} end={end} />
                <p style={{textAlign: 'center'}}>
                  <button
                    onClick={toggleControls}
                    sx={{
                      margin: '1rem auto 0.5rem auto',
                      py: 2,
                      px: 4,
                      color: 'text',
                      backgroundColor: 'muted',
                      fontFamily: 'light',
                      fontSize: [1, 2],
                      textTransform: 'uppercase',
                      letterSpacing: '2px',
                      border: 'none',
                      borderRadius: '2rem',
                      cursor: 'pointer',
                      '&:hover': {
                        color: 'accent',
                        backgroundColor: 'shade1',
                      },
                      '&:focus': {
                        outline: 'none',
                      },
                    }}>
                    {showControls ? 'Hide' : 'Show'} Trim Controls
                  </button>
                </p>
                {showControls ? (
                  <TrimControls
                    start={start}
                    end={end}
                    videoInfo={data}
                    onTrim={trimVideo}
                  />
                ) : null}
              </Fragment>
            )}
          </Fragment>
        )}
      </div>
    </Layout>
  )
}
