/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx, useThemeUI} from 'theme-ui'
import Modal from 'react-modal'
import {IoClose} from 'react-icons/io5'
import Button from './Button'
import modalOptions from '../utils/modalOptions'

const ConfirmationModal = ({open, close, info: {name, type, action}}) => {
  const {theme, colorMode} = useThemeUI()

  const afterOpenModal = () => {}

  const customStyles = modalOptions(theme, colorMode)

  return (
    <Modal
      isOpen={open}
      onAfterOpen={afterOpenModal}
      onRequestClose={close}
      style={customStyles}
      contentLabel={`${type} ${name} delete confirmation modal`}
      ariaHideApp={false}>
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
          m: '2rem auto 1rem auto',
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
        <Button
          primary={{bg: 'background', color: 'text'}}
          hover={{bg: 'muted', color: 'accent'}}
          text='Cancel'
          action={close}
        />
        <Button
          primary={{bg: 'dangerBorder', color: 'primary'}}
          hover={{bg: 'danger', color: 'secondary'}}
          text='Delete'
          action={action}
        />
      </div>
    </Modal>
  )
}

export default ConfirmationModal
