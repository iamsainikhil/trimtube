/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from 'theme-ui'
import {Fragment, useContext, useEffect, useState} from 'react'
import {ToastContext} from '../context/ToastContext'

const PlaylistCheckbox = ({data, start, end, index, name}) => {
  const [checked, setChecked] = useState(false)
  const {setShow, setMessage} = useContext(ToastContext)

  const showToast = (message) => {
    setMessage(message)
    setShow(true)
  }

  /**
   * Check if the video exists in the given playlist
   * @param {String} name
   * @returns {Boolean}
   */
  const videoExistsInPlaylist = (name) => {
    const playlists = JSON.parse(localStorage.getItem('playlists'))
    if (playlists[name]?.videos && playlists[name]?.videos.length) {
      let matched = []
      playlists[name].videos.forEach((v) => {
        const idMatch = v.id === data.items[0].id
        const startMatch = v.start == start
        const endMatch = v.end == end
        matched.push(idMatch && startMatch && endMatch)
      })
      return matched.includes(true)
    } else {
      return false
    }
  }

  const addVideoToPlaylist = () => {
    const playlists = JSON.parse(localStorage.getItem('playlists'))
    const videoDetails = {
      ...data.items[0],
      start: isNaN(start) ? null : start,
      end: isNaN(end) ? null : end,
    }
    if (playlists[name].videos) {
      playlists[name].videos.push(videoDetails)
    } else {
      playlists[name].videos = [videoDetails]
    }
    localStorage.setItem('playlists', JSON.stringify(playlists))
    showToast(`Added to ${name} playlist!`)
  }

  const removeVideoFromPlaylist = () => {
    const playlists = JSON.parse(localStorage.getItem('playlists'))
    const videos = playlists[name].videos.filter(
      (v) => v.id !== data.items[0].id
    )
    playlists[name].videos = videos
    localStorage.setItem('playlists', JSON.stringify(playlists))
    showToast(`Removed from ${name} playlist!`)
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
  }, [name])

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
