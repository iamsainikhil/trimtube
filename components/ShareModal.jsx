/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx, useThemeUI} from 'theme-ui'
import Modal from 'react-modal'
import {IoClose} from 'react-icons/io5'
import modalOptions from '../utils/modalOptions'
import Share from './Share'

const ShareModal = ({open, close, url, name}) => {
  Modal.setAppElement('main')
  const {theme, colorMode} = useThemeUI()

  const afterOpenModal = () => {}

  let options = modalOptions(theme, colorMode)
  options.content.width = '90%'
  options.content.maxWidth = '550px'

  const copyLink = (link) => {
    console.log(link)
  }

  return (
    <Modal
      isOpen={open}
      onAfterOpen={afterOpenModal}
      onRequestClose={close}
      style={options}
      contentLabel='Share modal'>
      <p
        sx={{
          mt: 3,
          mb: 0,
          mx: 3,
        }}>
        Share
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
      {/* <hr sx={{mx: 0, p: 0}} /> */}
      <div
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          py: 2,
          maxWidth: '90%',
          m: '1rem auto',
        }}>
        <Share videoURL={url} videoName={name} />
        <div
          sx={{
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            m: 4,
            py: 1,
            px: 2,
            bg: 'search',
            color: 'text',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'search',
            borderRadius: '25px',
            width: '100%',
            height: '2rem',
            fontFamily: 'light',
            fontSize: [1, 2],
          }}>
          <p
            sx={{
              p: 1,
              maxWidth: '80%',
              overflowX: 'auto',
              whiteSpace: 'pre',
            }}>
            {url}
          </p>
          <p
            onClick={copyLink}
            sx={{
              mx: 2,
              p: 1,
              cursor: 'pointer',
              '&:hover': {
                bg: 'highlight',
                borderRadius: '25px',
              },
            }}>
            COPY
          </p>
        </div>
      </div>
    </Modal>
  )
}

export default ShareModal
