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

const Video = () => {
  const router = useRouter()
  const {query} = router
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(null)
  const [data, setData] = useState(undefined)
  const [error, setError] = useState(undefined)
  const [loading, setLoading] = useState(false)
  const videoId = query.id
  console.log(query)

  const fetchVideoInfo = () => {
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
          <Info data={data} error={error} />
          <TrimControls
            start={start}
            end={end}
            videoInfo={data}
            onTrim={trimVideo}
          />
        </Fragment>
      )}
    </div>
  )
}

export default Video
