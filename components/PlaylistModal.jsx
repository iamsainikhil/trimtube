/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx, useThemeUI} from 'theme-ui'
import {Fragment, useContext, useEffect, useState} from 'react'
import dayjs from 'dayjs'
import Modal from 'react-modal'
import PlaylistCheckbox from './PlaylistCheckbox'
import {IoClose} from 'react-icons/io5'
import {BiPlus} from 'react-icons/bi'
import Button from './Button'
import modalOptions from '../utils/modalOptions'
import {ToastContext} from '../context/ToastContext'

const PlaylistModal = ({data, start, end, open, close}) => {
  const {theme, colorMode} = useThemeUI()
  const [playlists, setPlaylists] = useState(null)
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false)
  const [playlistName, setPlaylistName] = useState('')
  const {setShow, setMessage} = useContext(ToastContext)

  const showToast = (message) => {
    setMessage(message)
    setShow(true)
  }

  const createPlaylist = () => {
    if (playlistName.trim()) {
      let playlists = {}
      playlists[playlistName] = {
        name: playlistName,
        created: dayjs().toISOString(),
      }
      if (localStorage.getItem('playlists')) {
        const localPlaylists = JSON.parse(localStorage.getItem('playlists'))

        if (localPlaylists[playlistName]) {
          playlists = {
            ...localPlaylists,
          }
        } else {
          playlists = {
            ...localPlaylists,
            ...playlists,
          }
        }
      }
      localStorage.setItem('playlists', JSON.stringify(playlists))
      setPlaylists(Object.keys(playlists))
      setPlaylistName('')
      showToast(`Created ${playlistName} playlist`)
      setShowCreatePlaylist(false)
    }
  }

  const afterOpenModal = () => {
    if (localStorage.getItem('playlists')) {
      setPlaylists(Object.keys(JSON.parse(localStorage.getItem('playlists'))))
    }
  }

  const customStyles = modalOptions(theme, colorMode)

  useEffect(() => {
    if (localStorage.getItem('playlists')) {
      setPlaylists(Object.keys(JSON.parse(localStorage.getItem('playlists'))))
    }
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
              justifyContent: 'center',
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
              onChange={(e) => setPlaylistName(e.target.value)}
            />
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
                setShowCreatePlaylist(false)
              }}
            />
            <Button
              primary={{bg: 'shade2', color: 'text'}}
              hover={{bg: 'shade1', color: 'accent'}}
              text='Create'
              action={createPlaylist}
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
