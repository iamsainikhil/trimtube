/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx, useThemeUI} from 'theme-ui'
import Modal from 'react-modal'
import {IoClose} from 'react-icons/io5'

const ConfirmationModal = ({open, close, info: {name, type, action}}) => {
  Modal.setAppElement('main')
  const {theme, colorMode} = useThemeUI()

  const afterOpenModal = () => {}

  const customStyles = {
    overlay: {
      backgroundColor:
        colorMode === 'dark'
          ? 'rgba(0, 0, 0, 0.95)'
          : 'rgba(247,248,249, 0.95)',
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
      width: '75%',
      height: 'auto',
      background: theme.colors.muted,
      boxSizing: 'border-box',
      padding: 0,
    },
  }
  return (
    <Modal
      isOpen={open}
      onAfterOpen={afterOpenModal}
      onRequestClose={close}
      style={customStyles}
      contentLabel={`${type} ${name} delete confirmation modal`}>
      {/* <p
        sx={{
          mt: 3,
          mb: 0,
          mx: 3,
        }}>
        Delete
      </p> */}
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
      {/* <hr sx={{mx: 0, p: 0}} /> */}
      <div
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          py: 2,
          maxWidth: '85%',
          m: '1rem auto',
        }}>
        <p>
          Are you sure want to delete {type} {name}?
        </p>
      </div>
      {/* <hr sx={{mx: 0, p: 0}} /> */}
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
            mx: 2,
            bg: 'muted',
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
            '@media (max-width: 40rem)': {
              px: 2,
              fontSize: 0,
              letterSpacing: '0.02',
            },
          }}
          onClick={close}>
          Cancel
        </button>
        <button
          sx={{
            py: 2,
            px: 4,
            bg: 'dangerBorder',
            color: 'primary',
            fontFamily: 'light',
            fontSize: 2,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            border: 'none',
            borderRadius: '2rem',
            cursor: 'pointer',
            '&:hover': {
              bg: 'danger',
              color: 'secondary',
            },
            '@media (max-width: 40rem)': {
              px: 3,
              fontSize: 0,
              letterSpacing: '0.02',
            },
          }}
          onClick={action}>
          Delete
        </button>
      </div>
    </Modal>
  )
}

export default ConfirmationModal
