/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from 'theme-ui'
import {Fragment, useState, useContext, useEffect, createRef} from 'react'
import axios from 'axios'
import {
  BiShuffle,
  BiChevronDown,
  BiChevronUp,
  BiShareAlt,
  BiCloudDownload,
} from 'react-icons/bi'
import {MdRepeatOne, MdRepeat, MdPlaylistAdd} from 'react-icons/md'
import {ToastContext} from '../context/ToastContext'
import PlaylistModal from './PlaylistModal'
import ShareModal from './ShareModal'
import formatTime from './../utils/formatTime'
import {dateNow} from './../utils/date'
import recursivePlaylistData from '../utils/recursivePlaylistData'
import Loader from './Loader'

const LOOP_STATUS_MAPPERS = {
  LOOP_VIDEO: 'video',
  LOOP_PLAYLIST: 'playlist',
  PLAY_PLAYLIST: 'off',
}

const Playlistvideos = ({
  videoNumber,
  playlistName,
  playlistVideos,
  loopStatus,
  shuffle,
  onVideoClick,
  onLoopClick,
  onShuffleClick,
  updatePlaylistVideos,
}) => {
  const [loading, setLoading] = useState(false)
  const [expand, setExpand] = useState(true)
  const [localLoopStatus, setLocalLoopStatus] = useState(loopStatus)
  const [showShareModal, setShowShareModal] = useState(false)
  const [showPlaylistModal, setShowPlaylistModal] = useState(false)
  const [video, setVideo] = useState(null)
  const [hoveredVideoIndex, setHoveredVideoIndex] = useState(null)
  const {setShow, setMessage} = useContext(ToastContext)
  const dynamicBorderRadius = expand
    ? {
        borderTopLeftRadius: '15px',
        borderTopRightRadius: '15px',
      }
    : {
        borderRadius: '15px',
      }
  const loopShuffleIconStyles = {
    p: 1,
    fontSize: '36px',
    cursor: 'pointer',
    '&:hover': {
      borderRadius: '50%',
      bg: 'shade2',
    },
  }
  const refs = playlistVideos.reduce((acc, curr, index) => {
    acc[index] = createRef()
    return acc
  }, {})

  const playlists = JSON.parse(localStorage.getItem('playlists'))
  const playlist = playlists[playlistName]

  const showToast = (message) => {
    setMessage(message)
    setShow(true)
  }

  const saveToPlaylist = (e, video) => {
    e.stopPropagation()
    setVideo(video)
    setShowPlaylistModal(true)
  }

  const getShareURL = () => {
    const videoIds = playlistVideos.map((v) => v.id).join('***')
    const startTimes = playlistVideos.map((v) => v.start || 0).join('-')
    const endTimes = playlistVideos.map((v) => v.end || 0).join('-')
    const created = playlist?.created || dateNow()
    return `/playlist?id=${playlistName}&v=${videoIds}&s=${startTimes}&e=${endTimes}&dt=${created}`
  }

  // sync the playlist with the remote YT playlist
  // merge the videos by excluding the remote playlist videos with the same id as in the local playlist
  const syncPlaylist = async (token = '') => {
    try {
      setLoading(true)
      const res = await axios.get('/api/playlist', {
        params: {id: playlist.id, token},
      })
      const remotePlaylistData = recursivePlaylistData(res.data, syncPlaylist)
      // create a map of video Ids in the playlist stored locally
      const videoIdMap = {}
      playlist.videos.forEach((v) => {
        videoIdMap[v.id] = v
      })
      // loop through the remote playlist items and filter out items with ids already in videoIdMap
      if (remotePlaylistData) {
        const remotePlaylistVideos = remotePlaylistData.items
          .filter((item) => !videoIdMap[item.contentDetails.videoId])
          .map((v) => ({
            ...v,
            id: v.contentDetails.videoId,
            start: 0,
            end: 0,
          }))
        playlist.videos.push(...remotePlaylistVideos)
        localStorage.setItem('playlists', JSON.stringify(playlists))
        updatePlaylistVideos(playlist.videos)
      }
    } catch (error) {
      showToast('Failed to sync playlist')
    } finally {
      setLoading(false)
      showToast('Successfully synced playlist')
    }
  }

  useEffect(() => {
    if (refs[videoNumber - 1] && refs[videoNumber - 1].current) {
      refs[videoNumber - 1].current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
    return () => {}
  }, [videoNumber])

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
          width: '380px',
          border: '1px solid gray',
          borderRadius: '15px',
          '@media (max-width: 63rem)': {
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
            flexDirection: 'column',
            justifyContent: 'center',
            px: 5,
            py: 0,
            ...dynamicBorderRadius,
          }}>
          <div
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <h3
              sx={{
                variant: 'heading',
                lineHeight: 1,
              }}>
              {playlistName}
            </h3>
            <p>
              {videoNumber}&nbsp;/&nbsp;{playlistVideos.length}
            </p>
          </div>
          <div
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <div>
              {localLoopStatus === 'LOOP_VIDEO' && (
                <MdRepeatOne
                  sx={loopShuffleIconStyles}
                  title='Loop Playlist'
                  aria-label='Loop Playlist'
                  onClick={() => {
                    setLocalLoopStatus('LOOP_PLAYLIST')
                    onLoopClick(LOOP_STATUS_MAPPERS['LOOP_PLAYLIST'])
                    showToast('Playlist repeat is ON')
                  }}
                />
              )}
              {localLoopStatus === 'LOOP_PLAYLIST' && (
                <MdRepeat
                  sx={loopShuffleIconStyles}
                  title="Don't Loop Playlist"
                  aria-label="Don't Loop Playlist"
                  onClick={() => {
                    setLocalLoopStatus('PLAY_PLAYLIST')
                    onLoopClick(LOOP_STATUS_MAPPERS['PLAY_PLAYLIST'])
                    showToast('Playlist repeat is OFF')
                  }}
                />
              )}
              {localLoopStatus === 'PLAY_PLAYLIST' && (
                <MdRepeat
                  sx={{
                    ...loopShuffleIconStyles,
                    color: 'rgba(0,0,0,0.5)',
                    cursor: 'pointer',
                    '&:hover': {
                      borderRadius: '50%',
                      bg: 'highlight',
                    },
                  }}
                  title='Loop Video'
                  aria-label='Loop Video'
                  onClick={() => {
                    setLocalLoopStatus('LOOP_VIDEO')
                    onLoopClick(LOOP_STATUS_MAPPERS['LOOP_VIDEO'])
                    showToast('Video will repeat')
                  }}
                />
              )}
              <BiShuffle
                sx={{
                  p: 1,
                  ml: 3,
                  fontSize: '36px',
                  color: shuffle ? '' : 'rgba(0,0,0,0.5)',
                  cursor: 'pointer',
                  '&:hover': {
                    borderRadius: '50%',
                    bg: shuffle ? 'shade2' : 'highlight',
                  },
                }}
                title={`${shuffle ? 'Not' : ''} Shuffle Playlist`}
                aria-label={`${shuffle ? 'Not' : ''} Shuffle Playlist`}
                onClick={() => {
                  onShuffleClick(!shuffle)
                  showToast(`Playlist shuffle is ${shuffle ? 'OFF' : 'ON'}`)
                }}
              />
              <BiShareAlt
                sx={{
                  ...loopShuffleIconStyles,
                  ml: 3,
                  fontSize: 5,
                }}
                title='Share Playlist'
                aria-label='Share Playlist'
                onClick={() => {
                  setShowShareModal(true)
                }}
              />
              {playlist.id && (
                <BiCloudDownload
                  sx={{
                    ...loopShuffleIconStyles,
                    ml: 3,
                    fontSize: '34px',
                  }}
                  title='Sync Playlist'
                  aria-label='Sync Playlist'
                  onClick={async () => {
                    await syncPlaylist()
                  }}
                />
              )}
            </div>
            <div>
              {expand ? (
                <BiChevronUp
                  sx={{
                    fontSize: '36px',
                    mt: 1,
                    cursor: 'pointer',
                    '&:hover': {
                      borderRadius: '50%',
                      bg: 'shade2',
                    },
                  }}
                  title='Collapse List'
                  aria-label='Collapse videos list'
                  onClick={() => setExpand(false)}
                />
              ) : (
                <BiChevronDown
                  sx={{
                    fontSize: '36px',
                    mt: 1,
                    cursor: 'pointer',
                    '&:hover': {
                      borderRadius: '50%',
                      bg: 'shade2',
                    },
                  }}
                  title='Expand List'
                  aria-label='Expand videos list'
                  onClick={() => setExpand(true)}
                />
              )}
            </div>
          </div>
        </div>
        {expand && (
          <div
            sx={{
              my: 2,
              width: '100%',
              height: '100%',
              maxHeight: '600px',
              overflowX: 'hidden',
              overflowY: 'auto',
            }}>
            {loading ? (
              <Loader />
            ) : (
              <Fragment>
                {playlistVideos.map((video, index) => {
                  const {id, snippet, start, end} = video
                  return (
                    <div
                      ref={refs[index]}
                      sx={{
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        my: 1,
                        px: 2,
                        borderRadius: '15px',
                        bg: index + 1 === videoNumber ? 'search' : 'background',
                        '&:hover': {
                          bg: 'search',
                          cursor: 'pointer',
                        },
                      }}
                      title={snippet.title}
                      onClick={() =>
                        onVideoClick({
                          id,
                          start,
                          end,
                          loopValue: LOOP_STATUS_MAPPERS[loopStatus],
                        })
                      }
                      onMouseEnter={() => setHoveredVideoIndex(index)}
                      onMouseLeave={() => setHoveredVideoIndex(null)}
                      key={`${id}-${index}`}>
                      <img
                        src={snippet.thumbnails.medium.url}
                        alt={snippet.title}
                        title={snippet.title}
                        sx={{
                          width: '140px',
                          height: '90px',
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
                            width: '150px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}>
                          {snippet.title}
                        </p>
                        {/* <p>{snippet.channelTitle}</p> */}
                        <p sx={{color: 'gray'}}>
                          Start:{' '}
                          <span sx={{color: 'accent'}}>
                            {formatTime(start, 'Both')}
                          </span>
                          &nbsp;&nbsp; End:&nbsp;
                          <span sx={{color: 'accent'}}>
                            {formatTime(end, 'Both')}
                          </span>
                        </p>
                        {index + 1 === videoNumber ||
                        hoveredVideoIndex === index ? (
                          <MdPlaylistAdd
                            sx={{
                              position: 'absolute',
                              bottom: 0,
                              right: 0,
                              fontSize: 5,
                              mb: '12px',
                              mx: 2,
                              p: 1,
                              cursor: 'pointer',
                              '&:hover': {
                                borderRadius: '50%',
                                bg: 'shade2',
                              },
                              '@media (min-width: 64rem)': {
                                mb: '14px',
                              },
                            }}
                            title='Add to Playlist'
                            aria-label='Add to Playlist'
                            onClick={(e) => saveToPlaylist(e, video)}
                          />
                        ) : null}
                      </div>
                    </div>
                  )
                })}
              </Fragment>
            )}
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

      <ShareModal
        open={showShareModal}
        close={() => setShowShareModal(false)}
        url={getShareURL()}
        name={playlistName}
      />
    </Fragment>
  )
}

export default Playlistvideos
