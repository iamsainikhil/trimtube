/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from 'theme-ui'
import {Fragment} from 'react'
import Image from 'next/image'
import he from 'he'
import relativeTimeString from '../utils/relativeTimeString'
import formatNumber from '../utils/formatNumber'
import truncateText from '../utils/truncateText'
import formatTime from '../utils/formatTime'
import {FiPlay} from 'react-icons/fi'

const VideoDetails = ({data: {start, end, snippet, statistics}}) => {
  const title = he.decode(snippet.title)
  const publishedTime = relativeTimeString(snippet.publishedAt)

  return (
    <Fragment>
      <div style={{overflow: 'hidden', position: 'relative'}}>
        <Image
          src={snippet.thumbnails.high.url}
          alt={title}
          title={title}
          layout='responsive'
          width='300'
          height='200'
          className='video-thumbnail'
        />
        <p
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: ' flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FiPlay
            sx={{
              border: 'none',
              outline: 'none',
              cursor: 'pointer',
              fontSize: 6,
              pl: 1,
              py: 2,
              bg: 'background',
              borderRadius: '50%',
            }}
            title='Play video'
          />
        </p>
      </div>
      <div
        sx={{
          px: 3,
          pt: 3,
          pb: statistics ? 3 : 4,

          '@media (max-width: 30rem)': {
            px: 3,
          },
        }}>
        <h3
          sx={{
            m: 0,
            pt: 0,
            height: '2.5rem',
            fontSize: [2],
            '@media (max-width: 30rem)': {
              pt: 0,
              height: 'auto',
            },
          }}>
          {truncateText(title, 50)}
        </h3>
        <p
          sx={{
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
            {formatNumber(statistics.viewCount)} views | {publishedTime}
          </p>
        )}
        <p
          sx={{
            mt: 0,
            mb: 2,
            fontSize: [0],
            color: 'primary',
            maxHeight: '2rem',
          }}>
          {truncateText(he.decode(snippet.description), 75)}
        </p>
        {statistics && (
          <div
            sx={{
              display: 'flex',
              flexFlow: 'row nowrap',
              justifyContent: 'flex-start',
              alignItems: 'center',
              height: '2rem',
            }}>
            <p
              sx={{
                fontSize: [1],
                color: 'text',
              }}>
              Start:{' '}
              <span sx={{color: 'secondary'}}>{formatTime(start, 'Both')}</span>
            </p>
            <p
              sx={{
                ml: 2,
                fontSize: [1],
                color: 'text',
              }}>
              End:{' '}
              <span sx={{color: 'secondary'}}>{formatTime(end, 'Both')}</span>
            </p>
          </div>
        )}
      </div>
    </Fragment>
  )
}

export default VideoDetails
