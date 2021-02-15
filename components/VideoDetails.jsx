/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from 'theme-ui'
import {Fragment} from 'react'
import Image from 'next/image'
import he from 'he'
import relativeTimeString from '../utils/relativeTimeString'

const VideoDetails = ({data: {id, snippet, statistics}}) => {
  const title = he.decode(snippet.title)
  const publishedTime = relativeTimeString(snippet.publishedAt)
  return (
    <Fragment>
      <div style={{overflow: 'hidden'}}>
        <Image
          src={snippet.thumbnails.high.url}
          alt={title}
          title={title}
          layout='responsive'
          width='300'
          height='200'
          className='video-thumbnail'
        />
      </div>
      <div
        sx={{
          px: 3,
          py: 2,

          '@media (max-width: 30rem)': {
            px: 3,
          },
        }}>
        <h3
          sx={{
            m: 0,
            pt: 0,
            minHeight: '5rem',
            fontSize: [2],
            overflow: 'ellipsis',
            '@media (max-width: 30rem)': {
              pt: 0,
              height: 'auto',
            },
          }}>
          {title}
        </h3>
        <p
          sx={{
            mt: 0,
            fontSize: [1],
            color: 'gray',
          }}>
          {snippet.channelTitle}
          {!statistics && ` | ${publishedTime}`}
        </p>
        {statistics && (
          <p
            sx={{
              mt: 0,
              fontSize: [1],
              color: 'gray',
            }}>
            {statistics.viewCount} views | {publishedTime}
          </p>
        )}
        <p
          sx={{
            mt: 0,
            mb: 2,
            fontSize: [0],
            color: 'primary',
          }}>
          {he.decode(snippet.description)}
        </p>
      </div>
    </Fragment>
  )
}

export default VideoDetails
