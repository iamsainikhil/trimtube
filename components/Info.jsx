/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from 'theme-ui'
import {useRouter} from 'next/router'
import {Fragment, useState} from 'react'
import he from 'he'
import dayjs from 'dayjs'
import {BiLike, BiDislike, BiShareAlt} from 'react-icons/bi'
import {MdPlaylistAdd} from 'react-icons/md'
import formatNumber from '../utils/formatNumber'
import Share from './Share'
import PlaylistModal from './PlaylistModal'

const Info = ({data, start, end}) => {
  const {asPath: URL} = useRouter()
  const [showShareIcons, setShowShareIcons] = useState(false)
  const toggleShareIcons = () => {
    setShowShareIcons(!showShareIcons)
  }
  const [isOpen, setIsOpen] = useState(false)
  const openModal = () => {
    setIsOpen(true)
  }

  return (
    <div>
      {data.items && (
        <Fragment>
          <div sx={{my: 3, position: 'relative'}}>
            <h3
              sx={{
                mb: 1,
                fontSize: [2, 3],
              }}>
              {he.decode(data.items[0].snippet.title)}
            </h3>
            <div
              sx={{
                display: 'flex',
                flexFlow: 'row wrap',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}>
              <p
                sx={{
                  mt: 0,
                  fontSize: [1],
                  color: 'gray',
                }}>
                {formatNumber(data.items[0].statistics.viewCount)} views |{' '}
                {dayjs(data.items[0].snippet.publishedAt).format('MMM D, YYYY')}
              </p>
              <div
                sx={{
                  display: 'flex',
                  flexFlow: 'row wrap',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  mt: '-1.25rem',
                }}>
                <p sx={{mx: 2}}>
                  <BiLike
                    sx={{fontSize: [2], mb: '-0.2rem'}}
                    title='Likes'
                    aria-label='Likes'
                  />
                  &nbsp;
                  <span sx={{fontSize: [1]}}>
                    {formatNumber(data.items[0].statistics.likeCount)}
                  </span>
                </p>
                <p sx={{mx: 2}}>
                  <BiDislike
                    sx={{fontSize: [2], mb: '-0.2rem'}}
                    title='Dislikes'
                    aria-label='Dislikes'
                  />
                  &nbsp;
                  <span sx={{fontSize: [1]}}>
                    {formatNumber(data.items[0].statistics.dislikeCount)}
                  </span>
                </p>
                <p sx={{mx: 2}}>
                  <BiShareAlt
                    sx={{fontSize: [2], mb: '-0.2rem', cursor: 'pointer'}}
                    title='Share'
                    aria-label='Share'
                    onMouseEnter={toggleShareIcons}
                    onClick={toggleShareIcons}
                  />
                </p>
                <p sx={{mx: 2}}>
                  <MdPlaylistAdd
                    sx={{fontSize: [3], mb: '-0.35rem', cursor: 'pointer'}}
                    title='Add to Playlist'
                    aria-label='Add to Playlist'
                    onClick={openModal}
                  />
                </p>
              </div>
            </div>
            {showShareIcons && (
              <div
                sx={{
                  position: 'absolute',
                  mt: '-1rem',
                  right: 0,
                }}
                onMouseLeave={toggleShareIcons}>
                <Share
                  videoURL={URL}
                  videoName={he.decode(data.items[0].snippet.title)}
                  hideShareText={true}
                />
              </div>
            )}
          </div>

          <PlaylistModal
            data={data}
            start={start}
            end={end}
            isOpen={isOpen}
            close={() => {
              setIsOpen(false)
            }}
          />
        </Fragment>
      )}
    </div>
  )
}

export default Info
