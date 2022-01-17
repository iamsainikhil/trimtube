/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from 'theme-ui'
import {Fragment, useContext, useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import Layout from '../components/Layout'
import Alert from '../components/Alert'
import dayjs from 'dayjs'
import VideoListing from '../components/VideoListing'
import {BiSave, BiShareAlt, BiTrash} from 'react-icons/bi'
import Loader from '../components/Loader'
import axios from 'axios'
import siteUrl from './../utils/siteUrl'
import ConfirmationModal from '../components/ConfirmationModal'
import ShareModal from './../components/ShareModal'
import {ToastContext} from '../context/ToastContext'
import {trackGAEvent} from '../utils/googleAnalytics'

export default function Playlist({name, info, image, fetchData}) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [details, setDetails] = useState(undefined)
  const [showSave, setShowSave] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [showModal, setShowModal] = useState(false)
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

  const pluralizeText = (value, text) => {
    if (value === 1) return `${value} ${text}`
    return `${value} ${text}s`
  }

  const openModal = (type, name, message, action) => {
    setModalInfo({type, name, message, action})
    setShowModal(true)
  }

  const closeModal = () => {
    setModalInfo({type: '', name: '', message: null, action: null})
    setShowModal(false)
  }

  const mergeVideos = () => {
    const playlists = JSON.parse(localStorage.getItem('playlists'))
    playlists[name] = {
      name,
      created: playlists[name].created,
      videos: [...details.videos, ...playlists[name].videos],
    }
    localStorage.setItem('playlists', JSON.stringify(playlists))
    setDetails(playlists[name])
    setShowModal(false)
    showToast(`Merged videos into the ${name} playlist`)
    trackGAEvent(
      'save playlist',
      `Merged videos into the ${name} playlist`,
      'clicked on merge button'
    )
    setShowSave(false)
  }

  const savePlaylist = () => {
    const successMessage = `Added ${name} to playlists`
    if (localStorage.getItem('playlists')) {
      const playlists = JSON.parse(localStorage.getItem('playlists'))
      if (playlists[name]) {
        const message = `A playlist with name ${name} already exists. Are you sure want to merge videos in this playlist with the existing one?`
        trackGAEvent('save playlist', message, 'clicked on save icon')
        openModal('playlist', name, message, mergeVideos)
      } else {
        playlists[name] = details
        localStorage.setItem('playlists', JSON.stringify(playlists))
        showToast(successMessage)
        trackGAEvent('save playlist', successMessage, 'clicked on save icon')
        setShowSave(false)
      }
    } else {
      let newPlaylists = {
        [name]: details,
      }
      localStorage.setItem('playlists', JSON.stringify(newPlaylists))
      showToast(successMessage)
      trackGAEvent('save playlist', successMessage, 'clicked on save icon')
      setShowSave(false)
    }
    // update the URL to have only playlist name as the query without reloading the page
    router.push(`/playlist?id=${name}`, undefined, {shallow: true})
  }

  const deletePlaylist = () => {
    const playlists = JSON.parse(localStorage.getItem('playlists'))
    delete playlists[name]
    localStorage.setItem('playlists', JSON.stringify(playlists))
    showToast(`Deleted ${name} playlist`)
    trackGAEvent(
      'delete playlist',
      `Deleted ${name} playlist`,
      'clicked on trash icon'
    )
    closeModal()
    router.push('/playlists')
  }

  const deleteVideoModal = (data) => {
    openModal('video', data.name, null, () => {
      deleteVideo(data)
    })
  }

  const deleteVideo = (v) => {
    const playlists = JSON.parse(localStorage.getItem('playlists'))
    let deleteIndex = null
    const videos = [...playlists[name].videos]
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
    playlists[name].videos = videos
    localStorage.setItem('playlists', JSON.stringify(playlists))
    closeModal()
    showToast(`Removed ${v.name || v.id} from ${name} playlist`)
    trackGAEvent(
      'delete video',
      `Removed ${v.name || v.id} from ${name} playlist`,
      'clicked on trash icon'
    )
    setDetails(playlists[name])
  }

  const getShareURL = () => {
    const videoIds = details.videos.map((v) => v.id).join('***')
    const startTimes = details.videos.map((v) => v.start || 0).join('-')
    const endTimes = details.videos.map((v) => v.end || 0).join('-')
    const created = details.created
    return `${router.pathname}?id=${name}&v=${videoIds}&s=${startTimes}&e=${endTimes}&dt=${created}`
  }

  useEffect(() => {
    if (fetchData) {
      if (localStorage.getItem('playlists')) {
        const playlists = JSON.parse(localStorage.getItem('playlists'))
        if (playlists[name]) {
          setDetails(playlists[name])
        }
        setLoading(false)
      } else {
        setLoading(false)
      }
    } else {
      setDetails(info)
      setShowSave(true)
      setLoading(false)
    }
    return () => {}
  }, [name])

  return (
    <Layout
      title={name}
      page='Playlist'
      image={image}
      description={`Watch the playlist ${name} with ${
        info?.videos ? info.videos.length : ''
      } videos on TrimTube, a web application that features a media player which allows the user to trim and loop any portion of a YouTube video with an ability to save the video(s) to a playlist.`}>
      {loading ? (
        <Loader />
      ) : (
        <div sx={{bg: 'background'}}>
          {details ? (
            <Fragment>
              <div
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mt: 0,
                }}>
                <h2 sx={{mb: 0}}>{details.name}</h2>
                <p>
                  <span>{dayjs(details.created).format('MMM D, YYYY')}</span>
                  <span style={{margin: 'auto 1rem'}}>|</span>
                  <span>
                    {details.videos
                      ? `${pluralizeText(details.videos.length, 'video')}`
                      : '0 videos'}
                  </span>
                </p>
                <p sx={{mt: 0, position: 'relative'}}>
                  {showSave && (
                    <BiSave
                      sx={{mx: 3, cursor: 'pointer'}}
                      title='Save playlist'
                      aria-label='Share'
                      onClick={savePlaylist}
                    />
                  )}
                  <BiShareAlt
                    sx={{mx: 3, cursor: 'pointer'}}
                    title='Share playlist on'
                    aria-label='Share'
                    onClick={() => setShowShareModal(true)}
                  />
                  {!showSave && (
                    <BiTrash
                      sx={{mx: 3, cursor: 'pointer'}}
                      title='Delete playlist'
                      onClick={() =>
                        openModal('playlist', name, null, deletePlaylist)
                      }
                    />
                  )}
                </p>
              </div>
              {details.videos && (
                <div sx={{mt: 4, mb: 3}}>
                  <VideoListing
                    videos={details.videos}
                    remove={deleteVideoModal}
                  />
                  <ShareModal
                    open={showShareModal}
                    close={() => setShowShareModal(false)}
                    url={getShareURL()}
                    name={name}
                  />
                </div>
              )}
            </Fragment>
          ) : (
            <Alert
              type='danger'
              message={`No Playlist found with name "${name}"`}
            />
          )}
        </div>
      )}

      <ConfirmationModal open={showModal} close={closeModal} info={modalInfo} />
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const {id, v, s, e, dt} = context.query
  let info = undefined
  const name = id || null
  if (name && v) {
    const videoIds = v.split('***')
    let videos = []
    try {
      const baseURL = context.req ? siteUrl() : ''
      videos = (
        await axios.get('/api/video', {
          params: {id: videoIds.join(',')},
          baseURL,
        })
      ).data.items
      const startTimes = s ? s.split('-') : []
      const endTimes = e ? e.split('-') : []
      const updatedVideos = videos.map((video, i) => {
        return {
          ...video,
          start: startTimes.length ? startTimes[i] : 0,
          end: endTimes.length ? endTimes[i] : 0,
        }
      })
      info = {
        name,
        created: dt || dayjs().toISOString(),
        videos: updatedVideos,
      }
      return {
        props: {
          name,
          image: videos[0].snippet.thumbnails.standard.url,
          info,
          fetchData: false,
        },
      }
    } catch (error) {
      return {
        props: {
          name,
          fetchData: true,
        },
      }
    }
  } else {
    return {
      props: {
        name,
        fetchData: true,
      },
    }
  }
}
