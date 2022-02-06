/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from 'theme-ui'
import {Fragment, useState, useEffect} from 'react'
import router from 'next/router'
import axios from 'axios'
import Search from '../components/Search'
import Results from '../components/Results'
import Loader from '../components/Loader'
import Layout from '../components/Layout'
import {trackGAEvent} from '../utils/googleAnalytics'
import Button from '../components/Button'
import {dateNow} from '../utils/date'

const SEARCH_TYPES = {
  video: 'video',
  playlist: 'playlist',
}

const Input = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchType, setSearchType] = useState(SEARCH_TYPES.video)
  const [data, setData] = useState(undefined)
  const [error, setError] = useState(undefined)
  const [loading, setLoading] = useState(false)

  const getPlaceholder = () => {
    return searchType === SEARCH_TYPES.video
      ? 'Paste a YouTube video link or ID'
      : 'Paste a YouTube playlist link or ID'
  }

  // grab the ID of the video or playlist in a YT URL
  const getID = () => {
    const regex =
      searchType === SEARCH_TYPES.video
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

  const fetchVideo = () => {
    setLoading(true)
    axios
      .get('/api/video', {params: {id: getID()}})
      .then((res) => {
        updateDataError(res.data, undefined)
      })
      .catch((error) => {
        updateDataError(undefined, error)
      })
      .finally(() => setLoading(false))
  }

  let playlistData

  const recursiveUpdateData = (d) => {
    if (!playlistData) {
      playlistData = d
    } else {
      playlistData = {
        ...playlistData,
        items: playlistData.items.concat(d.items),
      }
    }
    if (!d?.nextPageToken) {
      updateDataError(playlistData, undefined)
      playlistData = undefined
      return
    }
    fetchPlaylist(d.nextPageToken)
  }

  const fetchPlaylist = (token = '') => {
    setLoading(true)
    axios
      .get('/api/playlist', {params: {id: getID(), token}})
      .then((res) => {
        recursiveUpdateData(res.data)
      })
      .catch((error) => {
        updateDataError(undefined, error)
      })
      .finally(() => setLoading(false))
  }

  const updateDataError = (data, error) => {
    setData(data)
    setError(error)
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
    if (!playlists[name]) {
      return name
    } else {
      return createPlaylistName(`${name}-copy`, playlists)
    }
  }

  const createPlaylist = () => {
    const playlists = JSON.parse(localStorage.getItem('playlists'))
    const name = createPlaylistName('Untitled', playlists)
    const videos = data?.items.map((video) => ({
      ...video,
      start: 0,
      end: 0,
      id: video?.snippet?.resourceId?.videoId || video.id,
    }))
    let playlist = {
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
  }

  useEffect(() => {
    if (searchTerm.trim()) {
      trackGAEvent(
        'search',
        `search for ${searchTerm}`,
        `${searchType} search input`
      )
      searchType === SEARCH_TYPES.video ? fetchVideo() : fetchPlaylist()
    }
    return () => {}
  }, [searchTerm])

  useEffect(() => {
    updateDataError(undefined, undefined)
    setSearchTerm('')
    return () => {}
  }, [searchType])

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
          <h2>
            <Button
              primary={{
                bg: searchType === SEARCH_TYPES.video ? 'background' : 'shade1',
                color: 'text',
              }}
              action={() => setSearchType(SEARCH_TYPES.video)}>
              Video
            </Button>
          </h2>
          <h2>
            <Button
              primary={{
                bg:
                  searchType === SEARCH_TYPES.playlist
                    ? 'background'
                    : 'shade1',
                color: 'text',
              }}
              action={() => setSearchType(SEARCH_TYPES.playlist)}>
              Playlist
            </Button>
          </h2>
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
            {searchType === SEARCH_TYPES.playlist && data?.items?.length && (
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
                  action={createPlaylist}>
                  Create a playlist
                </Button>
              </div>
            )}
            <Results data={data} error={error} />
          </Fragment>
        )}
      </div>
    </Layout>
  )
}

export default Input
