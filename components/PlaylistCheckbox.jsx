/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx, Checkbox} from 'theme-ui'
import {Fragment, useEffect, useState} from 'react'

const PlaylistCheckbox = ({data, start, end, index, name}) => {
  const [checked, setChecked] = useState(false)

  const videoExistsInPlaylist = (name) => {
    const playlists = JSON.parse(localStorage.getItem('playlists'))
    if (playlists[name]?.videos) {
      const matched = playlists[name].videos.filter(
        (v) => v.id === data.items[0].id
      )
      return matched.length > 0
    } else {
      return false
    }
  }

  const addVideoToPlaylist = () => {
    const playlists = JSON.parse(localStorage.getItem('playlists'))
    const videoDetails = {
      ...data.items[0],
      start,
      end,
    }
    if (playlists[name].videos) {
      playlists[name].videos.push(videoDetails)
    } else {
      playlists[name].videos = [videoDetails]
    }
    localStorage.setItem('playlists', JSON.stringify(playlists))
  }

  const removeVideoFromPlaylist = () => {
    const playlists = JSON.parse(localStorage.getItem('playlists'))
    const videos = playlists[name].videos.filter(
      (v) => v.id !== data.items[0].id
    )
    playlists[name].videos = videos
    localStorage.setItem('playlists', JSON.stringify(playlists))
  }

  const playlistCheckbox = () => {
    if (!checked) {
      if (!videoExistsInPlaylist()) {
        addVideoToPlaylist()
      }
    } else {
      removeVideoFromPlaylist()
    }
  }

  useEffect(() => {
    setChecked(videoExistsInPlaylist(name))
    return () => {}
  }, [])

  return (
    <Fragment>
      <input
        type='checkbox'
        name={`${index}-${name}`}
        checked={checked}
        onChange={() => {
          setChecked(!checked)
          playlistCheckbox()
        }}
        sx={{
          mx: 2,
        }}
      />
      <label htmlFor={`${index}-${name}`}>{name}</label>
    </Fragment>
  )
}

export default PlaylistCheckbox
