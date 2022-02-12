/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from 'theme-ui'
import Alert from './Alert'

const Error = ({message}) => {
  return (
    <div
      sx={{
        width: '75%',
        maxWidth: '1280px',
        mx: 'auto',
      }}>
      <Alert type='danger' message={message} />
    </div>
  )
}

export default Error
