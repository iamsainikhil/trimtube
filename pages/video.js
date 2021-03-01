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
    setStart(query.start ? Number(query.start) : null)
    setEnd(query.end ? Number(query.end) : null)
    return () => {}
  }, [query.start, query.end])

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
        }}>
        <Player videoId={videoId} start={start} end={end} />
        <Fragment>
          {error && (
            <Alert
              type='danger'
              message={`Unable to show video details and the controls to save this video to a playlist. Something went wrong in fetching the information of videoId ${
                videoId || ''
              }`}
            />
          )}
          {data && <Info data={data} start={start} end={end} />}
          <p style={{textAlign: 'center'}}>
            <Button
              primary={{bg: 'muted', color: 'text'}}
              hover={{bg: 'shade1', color: 'accent'}}
              action={toggleControls}>
              {showControls ? 'Hide' : 'Show'} Trim Controls
            </Button>
          </p>
          <TrimControls
            start={start}
            end={end}
            onTrim={trimVideo}
            displayCondition={showControls}
          />
        </Fragment>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const baseURL = context.req ? siteUrl() : ''
  if (context.query.id) {
    try {
      const {data} = await axios.get('/api/video', {
        params: {id: context.query.id},
        baseURL,
      })
      const {thumbnails} = data.items[0].snippet
      const {title} = data.items[0].snippet
      const image = thumbnails['standard']
        ? thumbnails.standard.url
        : thumbnails.high.url

      return {
        props: {
          data,
          title,
          image,
        },
      }
    } catch (err) {
      return {
        props: {
          error: err.message || err,
        },
      }
    }
  } else {
    return {
      props: {},
    }
  }
}
