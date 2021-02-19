/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx, useThemeUI} from 'theme-ui'
import Modal from 'react-modal'
import {IoClose} from 'react-icons/io5'
import modalOptions from '../utils/modalOptions'
import Share from './Share'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {useContext} from 'react'
import {ToastContext} from '../context/ToastContext'
import siteUrl from '../utils/siteUrl'

const ShareModal = ({open, close, url, name}) => {
  const {theme, colorMode} = useThemeUI()
  const {setShow, setMessage} = useContext(ToastContext)
  const URL = siteUrl(url)

  const afterOpenModal = () => {}

  let options = modalOptions(theme, colorMode)
  options.content.width = '90%'
  options.content.maxWidth = '550px'

  const copyLink = (link) => {
    setMessage('Video link copied to clipboard')
    setShow(true)
  }

  return (
    <Modal
      isOpen={open}
      onAfterOpen={afterOpenModal}
      onRequestClose={close}
      style={options}
      contentLabel='Share modal'
      ariaHideApp={false}>
      <p
        sx={{
          mt: 3,
          mb: 0,
          mx: 3,
          fontSize: 3,
          textAlign: 'center',
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
        <Share URL={URL} videoName={name} />
        <div
          sx={{
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            m: 4,
            py: 1,
            pl: 2,
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
              whiteSpace: 'nowrap',
            }}>
            {URL}
          </p>
          <div
            sx={{
              ml: 2,
              py: 1,
              px: 3,
              cursor: 'pointer',
              textTransform: 'uppercase',
              '&:hover': {
                bg: 'highlight',
                borderRadius: '25px',
              },
            }}>
            <CopyToClipboard text={URL} onCopy={copyLink}>
              <span>Copy</span>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ShareModal
