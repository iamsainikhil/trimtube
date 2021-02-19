/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from 'theme-ui'
import PropTypes from 'prop-types'

const Alert = ({type, message}) => {
  return (
    <div
      sx={{
        width: '70%',
        mx: 'auto',
        mt: 3,
        py: 2,
        px: 3,
        backgroundColor: `${type}`,
        color: 'secondary',
        borderLeftWidth: '4px',
        borderLeftStyle: 'solid',
        borderLeftColor: `${type}Border`,
        fontSize: [2, 3],
        fontFamily: 'light',
      }}>
      {message}
    </div>
  )
}

Alert.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
}

export default Alert
