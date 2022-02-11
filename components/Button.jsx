/** @jsxRuntime classic */
/** @jsx jsx */
import {Fragment} from 'react'
import {jsx} from 'theme-ui'
import PropTypes from 'prop-types'

const Button = ({primary, hover, text, action, children, disabled = false}) => {
  return (
    <button
      disabled={disabled}
      sx={{
        py: 2,
        px: 4,
        mx: 2,
        bg: `${primary.bg}`,
        color: `${primary.color}`,
        fontFamily: 'light',
        fontSize: [2],
        textTransform: 'uppercase',
        letterSpacing: '2px',
        border: 'none',
        borderRadius: '2rem',
        cursor: disabled ? 'not-allowed !important' : 'pointer',
        '&:hover': {
          bg: hover ? `${hover.bg}` : '',
          color: hover ? `${hover.color}` : '',
        },
        '&:focus': {
          outline: 'none',
        },
      }}
      onClick={action}>
      {children ? <Fragment>{children}</Fragment> : text}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  primary: PropTypes.object,
  hover: PropTypes.object,
  action: PropTypes.func,
}

export default Button
