/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from 'theme-ui'
import {Fragment, useState, useContext, useEffect} from 'react'
import {useRouter} from 'next/router'
import {BiShuffle, BiChevronDown, BiChevronUp, BiTrashAlt} from 'react-icons/bi'
import {MdRepeatOne, MdRepeat, MdPlaylistAdd} from 'react-icons/md'
import PlaylistModal from './PlaylistModal'
import {ToastContext} from '../context/ToastContext'
import ConfirmationModal from './ConfirmationModal'
import formatTime from './../utils/formatTime'
import {trackGAEvent} from './../utils/googleAnalytics'

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
  shuffle,
  onVideoClick,
  onLoopClick,
  onShuffleClick,
  onVideoDelete,
}) => {
  const router = useRouter()
  const [expand, setExpand] = useState(true)
  const [showPlaylistModal, setShowPlaylistModal] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [video, setVideo] = useState(null)
  const dynamicBorderRadius = expand
    ? {
        borderTopLeftRadius: '15px',
        borderTopRightRadius: '15px',
      }
    : {
        borderRadius: '15px',
      }
  const [modalInfo, setModalInfo] = useState({
    type: '',
    name: '',
    action: null,
  })
  const {setShow, setMessage} = useContext(ToastContext)

  const showToast = (message) => {
    setMessage(message)
    setShow(true)
  }

  const openModal = (type, name, message, action) => {
    setModalInfo({type, name, message, action})
    setShowModal(true)
  }

  const closeModal = () => {
    setModalInfo({type: '', name: '', message: null, action: null})
    setShowModal(false)
  }

  const deleteVideoModal = (e, video) => {
    e.stopPropagation()
    setVideo(video)
    openModal('video', video.snippet.title, null, () => {
      deleteVideo(video)
    })
  }

  const deleteVideo = (v) => {
    const playlists = JSON.parse(localStorage.getItem('playlists'))
    let deleteIndex = null
    const videos = [...playlists[playlistName].videos]
    for (let i = 0; i < videos.length; i++) {
      if (
        v.id === videos[i].id &&
        v.start === videos[i].start &&
        v.end === videos[i].end
      ) {
        deleteIndex = i
        break
      }
    }
    videos.splice(deleteIndex, 1)
    playlists[playlistName].videos = videos
    localStorage.setItem('playlists', JSON.stringify(playlists))
    closeModal()
    showToast(
      `Removed ${v.snippet.title || v.id} from ${playlistName} playlist`
    )
    trackGAEvent(
      'delete video',
      `Removed ${v.snippet.title || v.id} from ${playlistName} playlist`,
      'clicked on trash icon'
    )
    const video =
      playlists[playlistName].videos[videoNumber] ||
      playlists[playlistName].videos[0]
    const {id, start, end} = router.query
    const videoParams = video
      ? {
          id: video?.id,
          start: video?.start,
          end: video?.end,
        }
      : {id, start, end}
    onVideoDelete(videoParams)
  }

  const saveToPlaylist = (e, video) => {
    e.stopPropagation()
    setVideo(video)
    setShowPlaylistModal(true)
  }

  useEffect(() => {
    setShowPlaylistModal(false)
    return () => {}
  }, [router.query.modal])
  return (
    <Fragment>
      <div
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          ml: 3,
          p: 0,
          width: '400px',
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
            ...dynamicBorderRadius,
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
                  onClick={() =>
                    onLoopClick(LOOP_STATUS_MAPPERS['LOOP_PLAYLIST'])
                  }
                />
              )}
              {loopStatus === 'LOOP_PLAYLIST' && (
                <MdRepeat
                  sx={{fontSize: 5, cursor: 'pointer'}}
                  title='Play Playlist'
                  aria-label='Play Playlist'
                  onClick={() =>
                    onLoopClick(LOOP_STATUS_MAPPERS['PLAY_PLAYLIST'])
                  }
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
                  onClick={() => onLoopClick(LOOP_STATUS_MAPPERS['LOOP_VIDEO'])}
                />
              )}
              <BiShuffle
                sx={{
                  ml: 3,
                  fontSize: '28px',
                  color: shuffle ? '' : 'rgba(0,0,0,0.5)',
                  cursor: 'pointer',
                }}
                title={`${shuffle ? 'Not' : ''} Shuffle Playlist`}
                aria-label={`${shuffle ? 'Not' : ''} Shuffle Playlist`}
                onClick={() => onShuffleClick(!shuffle)}
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
        {expand && (
          <div sx={{height: '100%', maxHeight: '600px', overflowY: 'auto'}}>
            {playlistVideos.map((video, index) => {
              const {id, snippet, start, end} = video
              return (
                <div
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    my: 1,
                    px: 2,
                    width: '100%',
                    borderRadius: '15px',
                    bg: index + 1 === videoNumber ? 'search' : 'background',
                    '&:hover': {
                      bg: 'search',
                      cursor: 'pointer',
                    },
                  }}
                  onClick={() =>
                    onVideoClick({
                      id,
                      start,
                      end,
                      loopValue: LOOP_STATUS_MAPPERS[loopStatus],
                    })
                  }
                  key={`${id}-${index}`}>
                  <img
                    src={snippet.thumbnails.medium.url}
                    alt={snippet.title}
                    title={snippet.title}
                    sx={{
                      width: '160px',
                      height: '120px',
                    }}
                    className='video-list-thumbnail'
                  />
                  <div
                    sx={{
                      mx: 1,
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
                    {/* <p>{snippet.channelTitle}</p> */}
                    <p sx={{color: 'text'}}>
                      Start:{' '}
                      <span sx={{color: 'secondary'}}>
                        {formatTime(start, 'Both')}
                      </span>
                      &nbsp;&nbsp; End:{' '}
                      <span sx={{color: 'secondary'}}>
                        {formatTime(end, 'Both')}
                      </span>
                    </p>
                    <MdPlaylistAdd
                      sx={{fontSize: 4, mb: 0, cursor: 'pointer'}}
                      title='Add to Playlist'
                      aria-label='Add to Playlist'
                      onClick={(e) => saveToPlaylist(e, video)}
                    />
                    <BiTrashAlt
                      sx={{fontSize: 2, ml: 3, mb: 1, cursor: 'pointer'}}
                      title='Delete video'
                      onClick={(e) => deleteVideoModal(e, video)}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {video && (
        <PlaylistModal
          data={video}
          start={video.start}
          end={video.end}
          open={showPlaylistModal}
          close={() => setShowPlaylistModal(false)}
        />
      )}

      <ConfirmationModal open={showModal} close={closeModal} info={modalInfo} />
    </Fragment>
  )
}

export default Playlistvideos
