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

const Video = () => {
  const router = useRouter()
  const {query} = router
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(null)
  const [data, setData] = useState(undefined)
  const [error, setError] = useState(undefined)
  const [loading, setLoading] = useState(false)
  const videoId = query.id || 'cLWmZpaTodg'

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
    <div
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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
              <TrimControls
                start={start}
                end={end}
                videoInfo={data}
                onTrim={trimVideo}
              />
            </Fragment>
          )}
        </Fragment>
      )}
    </div>
  )
}

export default Video
