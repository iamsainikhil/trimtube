/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx, useThemeUI} from 'theme-ui'
import {Fragment, useContext, useEffect, useState} from 'react'
import Modal from 'react-modal'
import PlaylistCheckbox from './PlaylistCheckbox'
import {IoClose} from 'react-icons/io5'
import {BiPlus} from 'react-icons/bi'
import Button from './Button'
import modalOptions from '../utils/modalOptions'
import {ToastContext} from '../context/ToastContext'
import {trackGAEvent} from '../utils/googleAnalytics'
import {dateNow} from './../utils/date'

const PlaylistModal = ({data, start, end, open, close}) => {
  const {theme, colorMode} = useThemeUI()
  const [playlists, setPlaylists] = useState(null)
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false)
  const [playlistName, setPlaylistName] = useState('')
  const [error, setError] = useState(null)
  const {setShow, setMessage} = useContext(ToastContext)

  const showToast = (message) => {
    setMessage(message)
    setShow(true)
  }

  const loadPlaylists = () => {
    if (localStorage.getItem('playlists')) {
      setPlaylists(Object.keys(JSON.parse(localStorage.getItem('playlists'))))
    }
  }

  /**
   * Check if a playlist already exist  in the localStorage with the given name
   * TODO: Allow duplicate creation of a playlist in future by appending "number" like "name-1", "name-2", etc.
   * @param {String} name
   */
  const playlistsExists = (name) => {
    if (name.trim()) {
      if (localStorage.getItem('playlists')) {
        const localPlaylists = JSON.parse(localStorage.getItem('playlists'))

        if (localPlaylists[name]) {
          trackGAEvent(
            'playlist creation',
            `Playlist with name ${name} already exists.`,
            'errors'
          )
          setError(`Playlist with name ${name} already exists.`)
        } else {
          setError('')
        }
      } else {
        setError('')
      }
    } else {
      trackGAEvent(
        'playlist creation',
        "Playlist name can't be empty!",
        'errors'
      )
      setError("Playlist name can't be empty!")
    }
  }

  const createPlaylist = () => {
    if (playlistName.trim()) {
      let playlists = {}
      playlists[playlistName] = {
        name: playlistName,
        created: dateNow(),
      }
      if (localStorage.getItem('playlists')) {
        const localPlaylists = JSON.parse(localStorage.getItem('playlists'))

        if (!localPlaylists[playlistName]) {
          playlists = {
            ...localPlaylists,
            ...playlists,
          }
        }
      }

      setError('')
      localStorage.setItem('playlists', JSON.stringify(playlists))
      setPlaylists(Object.keys(playlists))
      setPlaylistName('')
      showToast(`Created ${playlistName} playlist`)
      setShowCreatePlaylist(false)
    } else {
      setError("Playlist name can't be empty")
    }
  }

  const afterOpenModal = () => {
    setPlaylistName('')
    loadPlaylists()
  }

  const customStyles = modalOptions(theme, colorMode)

  useEffect(() => {
    loadPlaylists()
    return () => {}
  }, [])

  return (
    <Modal
      isOpen={open}
      onAfterOpen={afterOpenModal}
      onRequestClose={close}
      style={customStyles}
      contentLabel='Add to Playlist Modal'
      ariaHideApp={false}>
      <p
        sx={{
          mt: 3,
          mb: 0,
          mx: 3,
        }}>
        Save to
      </p>
      <IoClose
        onClick={close}
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          mt: 3,
          mr: 3,
          fontSize: 4,
          cursor: 'pointer',
        }}
      />
      <hr sx={{mx: 0, p: 0}} />
      <div
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          py: 2,
          height: '200px',
          overflowY: 'auto',
        }}>
        {playlists && playlists.length ? (
          <div>
            {playlists.map((name, index) => {
              return (
                <div sx={{my: 2}} key={index}>
                  <PlaylistCheckbox
                    data={data}
                    start={start}
                    end={end}
                    index={index}
                    name={name}
                  />
                </div>
              )
            })}
          </div>
        ) : (
          <p>No playlist found.</p>
        )}
      </div>
      <hr sx={{mx: 0, p: 0}} />

      {showCreatePlaylist ? (
        <Fragment>
          <div
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              my: 3,
            }}>
            <input
              type='text'
              placeholder='Playlist Name'
              sx={{
                bg: 'search',
                color: 'text',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'search',
                borderRadius: '2rem',
                width: '75%',
                py: 2,
                px: 4,
                fontFamily: 'light',
                fontSize: [2],
                outline: 'none',
              }}
              value={playlistName}
              onChange={(e) => {
                setPlaylistName(e.target.value)
                playlistsExists(e.target.value)
              }}
            />
            {error && (
              <p
                sx={{
                  mt: 1,
                  mx: 'auto',
                  width: '70%',
                  color: 'dangerBorder',
                  fontSize: 0,
                  lineHeight: 1,
                }}>
                {error}
              </p>
            )}
          </div>
          <div
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              m: 3,
            }}>
            <Button
              primary={{bg: 'background', color: 'text'}}
              hover={{bg: 'muted', color: 'accent'}}
              text='Cancel'
              action={() => {
                setPlaylistName('')
                setError('')
                setShowCreatePlaylist(false)
              }}
            />
            <Button
              primary={{bg: 'shade2', color: 'text'}}
              hover={{bg: 'shade1', color: 'accent'}}
              text='Create'
              action={createPlaylist}
              disabled={error !== ''}
            />
          </div>
        </Fragment>
      ) : (
        <div
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 0,
            mb: 2,
          }}>
          <Button
            primary={{bg: 'shade2', color: 'text'}}
            hover={{bg: 'shade1', color: 'accent'}}
            action={() => setShowCreatePlaylist(true)}>
            <BiPlus sx={{mb: '-0.2rem', mr: 1}} />
            Create playlist
          </Button>
        </div>
      )}
    </Modal>
  )
}

export default PlaylistModal
