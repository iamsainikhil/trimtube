/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx, useThemeUI} from 'theme-ui'
import React, {useState} from 'react'
import dayjs from 'dayjs'
import Modal from 'react-modal'
import PlaylistCheckbox from './PlaylistCheckbox'
import {IoClose} from 'react-icons/io5'
import {BiLike, BiDislike, BiShareAlt, BiPlus} from 'react-icons/bi'

const PlaylistModal = ({data, start, end, isOpen, close}) => {
  Modal.setAppElement('main')
  const {theme, colorMode} = useThemeUI()
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false)
  const [playlistName, setPlaylistName] = useState('')

  const createPlaylist = () => {
    let playlists = {}
    playlists[playlistName] = {
      name: playlistName,
      created: dayjs().toISOString(),
    }
    if (localStorage.getItem('playlists')) {
      const localPlaylists = JSON.parse(localStorage.getItem('playlists'))

      playlists = {
        ...localPlaylists,
        ...playlists,
      }
    }
    localStorage.setItem('playlists', JSON.stringify(playlists))
    setShowCreatePlaylist(false)
  }

  const afterOpenModal = () => {}

  const customStyles = {
    overlay: {
      backgroundColor:
        colorMode === 'dark'
          ? 'rgba(0, 0, 0, 0.95)'
          : 'rgba(247,248,249, 0.98)',
      zIndex: 10,
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '25px',
      width: '50%',
      height: 'auto',
      background: theme.background,
      boxSizing: 'border-box',
      padding: 0,
    },
  }
  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={close}
      style={customStyles}
      contentLabel='Add to Playlist Modal'>
      <p
        sx={{
          mt: 3,
          mb: 0,
          mx: 3,
        }}>
        Save to a playlist
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
        {localStorage.getItem('playlists') ? (
          <div
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}>
            {Object.keys(JSON.parse(localStorage.getItem('playlists'))).map(
              (name, index) => {
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
              }
            )}
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
            <button
              sx={{
                py: 2,
                px: 4,
                bg: 'shade2',
                color: 'text',
                fontFamily: 'light',
                fontSize: [1, 2],
                textTransform: 'uppercase',
                letterSpacing: '2px',
                border: 'none',
                borderRadius: '2rem',
                cursor: 'pointer',
                '&:hover': {
                  bg: 'shade1',
                  color: 'accent',
                },
              }}
              onClick={createPlaylist}>
              Create
            </button>
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
          <button
            sx={{
              py: 2,
              px: 4,
              bg: 'shade2',
              color: 'text',
              fontFamily: 'light',
              fontSize: [1, 2],
              textTransform: 'uppercase',
              letterSpacing: '2px',
              border: 'none',
              borderRadius: '2rem',
              cursor: 'pointer',
              '&:hover': {
                bg: 'shade1',
                color: 'accent',
              },
            }}
            onClick={() => setShowCreatePlaylist(true)}>
            <BiPlus sx={{mb: '-0.2rem', mr: 1}} />
            Create new playlist
          </button>
        </div>
      )}
    </Modal>
  )
}

export default PlaylistModal
