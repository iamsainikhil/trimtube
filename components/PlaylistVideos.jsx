/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from 'theme-ui'
import {useState} from 'react'
import Image from 'next/image'
import formatTime from './../utils/formatTime'
import {BiShuffle, BiChevronDown, BiChevronUp} from 'react-icons/bi'
import {MdRepeatOne, MdRepeat} from 'react-icons/md'

const LOOP_STATUS_MAPPERS = {
  LOOP_VIDEO: 'video',
  LOOP_PLAYLIST: 'playlist',
  PLAY_PLAYLIST: 'off',
}

const Playlistvideos = ({
  videoId,
  videoNumber,
  playlistName,
  playlistVideos,
  loopStatus,
  onVideoClick,
  onLoopClick,
}) => {
  const [expand, setExpand] = useState(true)
  return (
    <div
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        ml: 3,
        p: 0,
        height: '100%',
        width: '400px',
        overflowY: 'auto',
        border: '1px solid gray',
        borderRadius: '15px',
        '@media (max-width: 79rem)': {
          my: 5,
          mx: 'auto',
          minWidth: '300px',
          maxWidth: '100%',
        },
      }}>
      <div
        sx={{
          bg: 'muted',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 5,
        }}>
        <div
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <h3
            sx={{
              variant: 'heading',
              lineHeight: 1,
            }}>
            {playlistName}
          </h3>
          <div
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
            }}>
            {loopStatus === 'LOOP_VIDEO' && (
              <MdRepeatOne
                sx={{fontSize: 5, cursor: 'pointer'}}
                title='Loop Playlist'
                aria-label='Loop Playlist'
                onClick={() => onLoopClick('LOOP_PLAYLIST')}
              />
            )}
            {loopStatus === 'LOOP_PLAYLIST' && (
              <MdRepeat
                sx={{fontSize: 5, cursor: 'pointer'}}
                title='Play Playlist'
                aria-label='Play Playlist'
                onClick={() => onLoopClick('PLAY_PLAYLIST')}
              />
            )}
            {loopStatus === 'PLAY_PLAYLIST' && (
              <MdRepeat
                sx={{
                  fontSize: 5,
                  color: 'rgba(0,0,0,0.5)',
                  cursor: 'pointer',
                }}
                title='Loop Video'
                aria-label='Loop Video'
                onClick={() => onLoopClick('LOOP_VIDEO')}
              />
            )}
            <BiShuffle
              sx={{ml: 3, fontSize: 4, cursor: 'pointer'}}
              title='Collapse List'
              aria-label='Collapse videos list'
              onClick={() => setExpand(false)}
            />
          </div>
        </div>
        <div sx={{textAlign: 'center'}}>
          <p sx={{mb: 3}}>
            {videoNumber}&nbsp;/&nbsp;{playlistVideos.length}
          </p>
          {expand ? (
            <BiChevronUp
              sx={{fontSize: 5, mt: 1, cursor: 'pointer'}}
              title='Collapse List'
              aria-label='Collapse videos list'
              onClick={() => setExpand(false)}
            />
          ) : (
            <BiChevronDown
              sx={{fontSize: 5, mt: 1, cursor: 'pointer'}}
              title='Expand List'
              aria-label='Expand videos list'
              onClick={() => setExpand(true)}
            />
          )}
        </div>
      </div>
      {expand &&
        playlistVideos.map(({id, snippet, start, end}) => (
          <div
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              my: 1,
              px: 2,
              width: '100%',
              borderRadius: '15px',
              bg: id === videoId ? 'search' : 'background',
              '&:hover': {
                bg: 'search',
                cursor: 'pointer',
              },
            }}
            onClick={() =>
              onVideoClick(id, start, end, LOOP_STATUS_MAPPERS[loopStatus])
            }
            key={id}>
            <Image
              src={snippet.thumbnails.medium.url}
              alt={snippet.title}
              title={snippet.title}
              layout='intrinsic'
              width='160'
              height='160'
              className='video-list-thumbnail'
            />
            <div
              sx={{
                p: 2,
                lineHeight: 1.25,
                fontSize: [0, 1],
                color: 'gray',
              }}>
              <p
                sx={{
                  variant: 'medium',
                }}>
                {snippet.title}
              </p>
              <p>{snippet.channelTitle}</p>
              <p sx={{color: 'text'}}>
                Start:{' '}
                <span sx={{color: 'secondary'}}>
                  {formatTime(start, 'Both')}
                </span>
                &nbsp;&nbsp; End:{' '}
                <span sx={{color: 'secondary'}}>{formatTime(end, 'Both')}</span>
              </p>
            </div>
          </div>
        ))}
    </div>
  )
}

export default Playlistvideos
