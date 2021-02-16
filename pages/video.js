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

export default function Video({data, error, title, image}) {
  const router = useRouter()
  const {query} = router
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(null)
  const [showControls, setShowControls] = useState(false)
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
    setStart(Number(query.start))
    setEnd(Number(query.end))
    return () => {}
  }, [query])

  return (
    <Layout title={title} page='Video' image={image}>
      <div
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          bg: 'background',
        }}>
        <Player videoId={videoId} start={start} end={end} />
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
      </div>
    </Layout>
  )
}

Video.getInitialProps = async function (context) {
  let data = undefined
  let error = undefined
  let title = null
  let image = null
  const baseURL = context.req ? siteUrl() : ''
  try {
    data = (
      await axios.get('/api/video', {
        params: {videoId: context.query.id},
        baseURL,
      })
    ).data
    title = data.items[0].snippet.title
    image = data.items[0].snippet.thumbnails.standard.url
  } catch (err) {
    error = err
  }
  return {data, error, title, image}
}
