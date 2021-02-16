/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from 'theme-ui'
import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import Layout from '../../components/Layout'
import Alert from './../../components/Alert'
import dayjs from 'dayjs'
import VideoListing from '../../components/VideoListing'
import {FiTrash} from 'react-icons/fi'
import Loader from './../../components/Loader'

export default function Playlist() {
  const router = useRouter()
  const {id} = router.query
  const [loading, setLoading] = useState(true)
  const [details, setDetails] = useState({})

  const pluralizeText = (value, text) => {
    if (value === 1) return `${value} ${text}`
    return `${value} ${text}s`
  }

  const deletePlaylist = () => {
    const playlists = JSON.parse(localStorage.getItem('playlists'))
    delete playlists[id]
    localStorage.setItem('playlists', JSON.stringify(playlists))
    router.push('/playlists')
  }

  useEffect(() => {
    if (localStorage.getItem('playlists')) {
      const playlists = JSON.parse(localStorage.getItem('playlists'))
      if (playlists[id]) {
        setDetails(playlists[id])
      }
      setLoading(false)
    }
    return () => {}
  }, [id])

  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {details ? (
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
              <p sx={{mt: 0}}>
                <FiTrash
                  sx={{cursor: 'pointer'}}
                  title='Delete playlist'
                  onClick={deletePlaylist}
                />
              </p>
              {details.videos && (
                <div sx={{my: 3}}>
                  <VideoListing videos={details.videos} />
                </div>
              )}
            </div>
          ) : (
            <Alert
              type='danger'
              message={`No Playlist found with name "${id}"`}
            />
          )}
        </div>
      )}
    </Layout>
  )
}
