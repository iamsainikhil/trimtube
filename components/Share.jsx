/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from 'theme-ui'
import PropTypes from 'prop-types'
import Icon from './Icon'

const flexbox = {
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'center',
  alignItems: 'start',
}

const Share = ({URL, videoName}) => {
  const sharePlatforms = [
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${URL}`,
    },
    {
      name: 'Twitter',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        videoName
      )}&url=${URL}`,
    },
    {
      name: 'LinkedIn',
      url: `http://www.linkedin.com/shareArticle?url=${URL}`,
    },
    {
      name: 'WhatsApp',
      url: `https://wa.me/?text=${encodeURIComponent(`${videoName} ${URL}`)}`,
    },
  ]

  return (
    <div sx={flexbox}>
      {sharePlatforms.map((platform, index) => {
        return (
          <Icon
            name={platform.name}
            url={platform.url}
            style={{
              color: 'secondary',
              fontSize: [4, 5],
              mx: 3,
              my: 1,
            }}
            key={index}
          />
        )
      })}
    </div>
  )
}

Share.propTypes = {
  videoURL: PropTypes.string,
  videoName: PropTypes.string,
  hideShareText: PropTypes.bool,
}

export default Share
