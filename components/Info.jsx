/** @jsxRuntime classic */
/** @jsx jsx */
import {useState, useEffect} from 'react'
import {jsx} from 'theme-ui'
import {useRouter} from 'next/router'
import he from 'he'
import dayjs from 'dayjs'
import {BiLike, BiDislike, BiShareAlt} from 'react-icons/bi'
import {MdPlaylistAdd} from 'react-icons/md'
import formatNumber from '../utils/formatNumber'
import PlaylistModal from './PlaylistModal'
import ShareModal from './ShareModal'
import {trackGAEvent} from '../utils/googleAnalytics'

const Info = ({data, start, end}) => {
  const {query, asPath: URL} = useRouter()
  const [showPlaylistModal, setShowPlaylistModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)

  const openModal = (type) => {
    if (type === 'playlist') {
      setShowPlaylistModal(true)
    } else {
      setShowShareModal(true)
    }
    trackGAEvent(type, `clicked on ${URL} page ${type} icon`, 'icon click')
  }

  return (
    <div sx={{mx: 'auto', px: 2, maxWidth: '640px', width: '100%'}}>
      <div
        sx={{
          mt: '-0.5rem',
          mb: 2,
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <div
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            maxWidth: '100%',
          }}>
          <h2
            sx={{
              mb: 1,
              fontSize: [2, 3],
            }}>
            {he.decode(data.snippet.title)}
          </h2>
          <p
            sx={{
              mt: 0,
              fontSize: [1],
              color: 'gray',
            }}>
            {formatNumber(data.statistics.viewCount)} views |{' '}
            {dayjs(data.snippet.publishedAt).format('MMM D, YYYY')}
          </p>
        </div>
        <div
          sx={{
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {/* <p sx={{mx: 2}}>
                  <BiLike
                    sx={{fontSize: [2], mb: '-0.2rem'}}
                    title='Likes'
                    aria-label='Likes'
                  />
                  &nbsp;
                  <span sx={{fontSize: [1]}}>
                    {formatNumber(data.statistics.likeCount)}
                  </span>
                </p> */}
          {/* <p sx={{mx: 2}}>
                  <BiDislike
                    sx={{fontSize: [2], mb: '-0.2rem'}}
                    title='Dislikes'
                    aria-label='Dislikes'
                  />
                  &nbsp;
                  <span sx={{fontSize: [1]}}>
                    {formatNumber(data.statistics.dislikeCount)}
                  </span>
                </p> */}
          <div
            sx={{
              display: 'flex',
              flexFlow: 'row nowrap',
              justifyContent: 'flex-start',
              alignItems: 'center',
              mx: 2,
            }}>
            <BiShareAlt
              sx={{fontSize: 3, mt: 1, cursor: 'pointer'}}
              title='Share Video'
              aria-label='Share Video'
              onClick={() => {
                openModal('share')
              }}
            />
            <p
              sx={{
                fontSize: [0, 1],
                mt: 3,
                pt: 1,
                mx: 1,
                cursor: 'pointer',
              }}
              title='Share Video'
              aria-label='Share Video'
              onClick={() => {
                openModal('share')
              }}>
              SHARE
            </p>
          </div>
          <div
            sx={{
              display: 'flex',
              flexFlow: 'row nowrap',
              justifyContent: 'flex-start',
              alignItems: 'center',
              mx: 2,
            }}>
            <MdPlaylistAdd
              sx={{fontSize: 4, mt: 1, cursor: 'pointer'}}
              title='Save to Playlist'
              aria-label='Save to Playlist'
              onClick={() => {
                openModal('playlist')
              }}
            />
            <p
              sx={{
                fontSize: [0, 1],
                mt: 3,
                pt: 1,
                mx: 1,
                cursor: 'pointer',
              }}
              title='Save to Playlist'
              aria-label='Save to Playlist'
              onClick={() => {
                openModal('playlist')
              }}>
              SAVE
            </p>
          </div>
        </div>
        {/* <div
              sx={{
                display: 'flex',
                flexFlow: 'row wrap',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}>
              
              
            </div> */}
      </div>

      <ShareModal
        open={showShareModal}
        close={() => setShowShareModal(false)}
        url={URL}
        name={he.decode(data.snippet.title)}
      />

      <PlaylistModal
        data={data}
        start={start}
        end={end}
        open={showPlaylistModal}
        close={() => {
          setShowPlaylistModal(false)
        }}
      />
    </div>
  )
}

export default Info
