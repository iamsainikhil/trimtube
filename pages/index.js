/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx, Spinner} from 'theme-ui'
import {Fragment, useState, useEffect} from 'react'
import router from 'next/router'
import axios from 'axios'
import Search from '../components/Search'
import Results from '../components/Results'
import Loader from '../components/Loader'
import Layout from '../components/Layout'
import Tab from '../components/Tab'
import Button from '../components/Button'
import Sections from './../components/Sections'
import {trackGAEvent} from '../utils/googleAnalytics'
import {dateNow} from '../utils/date'
import recursivePlaylistData from '../utils/recursivePlaylistData'

const TABS = {
  video: 'video',
  playlist: 'playlist',
}

const Input = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState(TABS.video)
  const [data, setData] = useState(undefined)
  const [error, setError] = useState(undefined)
  const [loading, setLoading] = useState(false)
  const [btnLoading, setBtnLoading] = useState(false)

  const getPlaceholder = () => {
    return activeTab === TABS.video
      ? 'Paste a YouTube video URL or ID'
      : 'Paste a YouTube playlist URL or ID'
  }

  const updateDataError = (data, error) => {
    setData(data)
    setError(error)
  }

  // grab the ID of the video or playlist in a YT URL
  const getID = () => {
    const regex =
      activeTab === TABS.video
        ? /(?:\&v=|\?v=|be\/)([\w\d-]+)/
        : /(?:\&list=|\?list=|be\/)([\w\d-]+)/
    if (searchTerm.includes('.')) {
      const match = searchTerm.match(regex)
      if (match) {
        const [, id] = match
        return id
      }
    }
    return searchTerm
  }

  const fetchResults = (token = '') => {
    setLoading(true)
    const URL = activeTab === TABS.video ? '/api/video' : '/api/playlist'
    axios
      .get(URL, {params: {id: getID(), token}})
      .then((res) => {
        if (activeTab === TABS.video) {
          updateDataError(res.data, undefined)
        } else {
          const playlistData = recursivePlaylistData(res.data, fetchResults)
          updateDataError(playlistData, undefined)
        }
      })
      .catch((error) => {
        updateDataError(undefined, error)
      })
      .finally(() => setLoading(false))
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  /**
   * create a playlist with name 'Untitled' or 'Untitled-copy' or 'Untitled-copy-copy-..'
   * @param {String} name
   * @param {Object} playlists
   * @returns {String}
   */
  const createPlaylistName = (name, playlists) => {
    if (playlists[name]) {
      return createPlaylistName(`${name}-copy`, playlists)
    } else {
      return name
    }
  }

  const createPlaylist = async () => {
    try {
      setBtnLoading(true)
      const playlists = JSON.parse(localStorage.getItem('playlists'))
      const name = createPlaylistName('Untitled', playlists)
      const videos = await data?.items.map((video) => ({
        ...video,
        start: 0,
        end: 0,
        id: video?.contentDetails?.videoId || video.id,
      }))
      let playlist = {
        id: getID(), // this is used later in the video page to sync the playlist with YT
        name,
        created: dateNow(),
        videos,
      }
      playlists[name] = playlist
      localStorage.setItem('playlists', JSON.stringify(playlists))
      router.push({
        pathname: '/playlist',
        query: {id: name},
      })
    } catch (error) {
      console.error(error)
      setBtnLoading(false)
    }
  }

  useEffect(() => {
    setBtnLoading(false)
    if (searchTerm.trim()) {
      trackGAEvent(
        'search',
        `search for ${searchTerm}`,
        `${activeTab} search input`
      )
      fetchResults()
    }
    return () => {}
  }, [searchTerm])

  useEffect(() => {
    updateDataError(undefined, undefined)
    setSearchTerm('')
    setBtnLoading(false)
    return () => {}
  }, [activeTab])

  return (
    <Layout title='Search'>
      <div sx={{bg: 'background'}}>
        <div
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 0,
            fontSize: [3, 4, 5],
          }}>
          <Tab
            label={TABS.video}
            activeTab={activeTab}
            action={() => setActiveTab(TABS.video)}
          />
          <Tab
            label={TABS.playlist}
            activeTab={activeTab}
            action={() => setActiveTab(TABS.playlist)}
          />
        </div>
        <Search
          searchTerm={searchTerm}
          placeholder={getPlaceholder()}
          updateSearch={handleSearch}
        />
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            {activeTab === TABS.playlist && data?.items?.length && (
              <div
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mt: 5,
                  mb: -4,
                }}>
                <Button
                  primary={{bg: 'shade2', color: 'text'}}
                  hover={{bg: 'shade1', color: 'accent'}}
                  action={createPlaylist}
                  disabled={btnLoading}>
                  <span>Create a playlist</span>
                  {btnLoading && (
                    <span sx={{verticalAlign: 'middle', mx: 2}}>
                      <Spinner size='18' />
                    </span>
                  )}
                </Button>
              </div>
            )}
            <Results data={data} error={error} />
          </Fragment>
        )}

        <div sx={{mt: 6, mb: 3}}>
          <h1 sx={{textAlign: 'center', mb: 0}}>How to use TrimTube?</h1>
          <Sections />
        </div>
      </div>
    </Layout>
  )
}

export default Input
