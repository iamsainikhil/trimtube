/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from 'theme-ui'
import {
  GrLinkedinOption,
  GrTwitter,
  GrGithub,
} from 'react-icons/gr'
import PropTypes from 'prop-types'

const Icon = ({name, url, style}) => {
  const renderIcon = () => {
    switch (name) {
      case 'Twitter':
        return (
          <GrTwitter
            sx={{
              ...style,
              '&:hover': {
                color: '#1da1f2',
              },
            }}
          />
        )
      case 'LinkedIn':
        return (
          <GrLinkedinOption
            sx={{
              ...style,
              '&:hover': {
                color: '#0077b5',
              },
            }}
          />
        )
      case 'GitHub':
        return (
          <GrGithub
            sx={{
              ...style,
              '&:hover': {
                color: '#333',
              },
            }}
          />
        )
      default:
        return null
    }
  }

  return (
    <a
      href={url}
      target='_blank'
      rel='noreferrer noopener'
      aria-label={name}
      title={name}
      onClick={() =>
        trackGAEvent('social icons', `clicked on ${name} link`, 'icon click')
      }>
      {renderIcon()}
    </a>
  )
}

Icon.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
  style: PropTypes.object,
}

export default Icon
