/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from 'theme-ui'
import PropTypes from 'prop-types'
import pluralizeText from '../utils/pluralizeText'

/**
 * @param {String} name (Start or End)
 * @param {String} type (Minutes or Seconds)
 * @param {String | Number} time
 * @param {Function} valueChange
 */
const TimeInput = ({name, type, time, valueChange}) => {
  return (
    <div
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        mx: 2,
        mt: 3,
      }}>
      <input
        sx={{
          maxWidth: '3rem',
          bg: 'search',
          color: 'text',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'search',
          borderRadius: '2.5rem',
          fontFamily: 'light',
          fontSize: 2,
          outline: 'none',
          textAlign: 'center',
        }}
        type='tel'
        name={`${name}${type}`}
        value={isNaN(time) ? '' : time}
        onChange={valueChange}
      />
      <label htmlFor={`${name}${type}`} sx={{fontSize: 0}}>
        {pluralizeText(isNaN(time) ? 0 : Number(time), type)}
      </label>
    </div>
  )
}

TimeInput.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
}

export default TimeInput
