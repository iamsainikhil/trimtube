/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from 'theme-ui'
import {Fragment, useEffect, useState} from 'react'
import Layout from '../components/Layout'
import Alert from '../components/Alert'
import dayjs from 'dayjs'
import VideoListing from '../components/VideoListing'
import {FiTrash} from 'react-icons/fi'
import {BiShareAlt} from 'react-icons/bi'
import Loader from '../components/Loader'
import Share from '../components/Share'
import axios from 'axios'
import siteUrl from './../utils/siteUrl'

export default function Playlist({name, info, image, fetchData}) {
  console.log(name, info, image, fetchData)
  const [loading, setLoading] = useState(true)
  const [details, setDetails] = useState(undefined)
  const [showShareIcons, setShowShareIcons] = useState(false)
  const toggleShareIcons = () => {
    setShowShareIcons(!showShareIcons)
  }

  const pluralizeText = (value, text) => {
    if (value === 1) return `${value} ${text}`
    return `${value} ${text}s`
  }

  const deletePlaylist = () => {
    const playlists = JSON.parse(localStorage.getItem('playlists'))
    delete playlists[name]
    localStorage.setItem('playlists', JSON.stringify(playlists))
    router.push('/playlists')
  }

  const getShareURL = () => {
    const videos = details.videos.map((v) => v.id)
    const videoIds = videos.join('-')
    console.log(`${router.asPath}-${videoIds}`)
    return `${router.asPath}-${videoIds}`
  }

  useEffect(() => {
    if (fetchData) {
      if (localStorage.getItem('playlists')) {
        const playlists = JSON.parse(localStorage.getItem('playlists'))
        if (playlists[name]) {
          setDetails(playlists[name])
        }
        setLoading(false)
      }
    } else {
      setDetails(info)
      setLoading(false)
    }
    return () => {}
  }, [name])

  return (
    <Layout title={name} page='Playlist' image={image}>
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
                }}>
                <h3 sx={{mb: 0}}>{details.name}</h3>
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
                  <BiShareAlt
                    sx={{mx: 3, cursor: 'pointer'}}
                    title='Share'
                    aria-label='Share'
                    onMouseEnter={toggleShareIcons}
                    onClick={toggleShareIcons}
                  />
                  <FiTrash
                    sx={{mx: 3, cursor: 'pointer'}}
                    title='Delete playlist'
                    onClick={deletePlaylist}
                  />
                </p>
                {showShareIcons && (
                  <div
                    sx={{
                      position: 'absolute',
                      mt: '9rem',
                      mr: '2rem',
                    }}
                    onMouseLeave={toggleShareIcons}>
                    <Share
                      videoURL={getShareURL()}
                      videoName={name}
                      hideShareText={true}
                    />
                  </div>
                )}
              </div>
              {details.videos && (
                <div sx={{mt: 4, mb: 3}}>
                  <VideoListing videos={details.videos} />
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
    </Layout>
  )
}

Playlist.getInitialProps = async function (context) {
  const {id} = context.query
  let image = null
  let info = undefined
  if (id && id.includes('-')) {
    const [name, ...videoIds] = id.split('-')
    let videos = []
    try {
      const baseURL = context.req ? siteUrl() : ''
      videos = (
        await axios.get('/api/video', {
          params: {videoId: videoIds.join(',')},
          baseURL,
        })
      ).data.items
      info = {
        name,
        created: dayjs().toISOString(),
        videos,
      }
      return {
        name,
        image: info.videos[0].snippet.thumbnails.standard.url,
        info,
        fetchData: false,
      }
    } catch (error) {
      return {
        name,
        image,
        info,
        fetchData: true,
      }
    }
  } else {
    return {
      name: id,
      image,
      info,
      fetchData: true,
    }
  }
}
