/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from 'theme-ui'
import {SORT_MAP} from './PlaylistVideos'
import {
  BsSortAlphaDown,
  BsSortAlphaDownAlt,
  BsSortNumericDown,
  BsSortNumericDownAlt,
} from 'react-icons/bs'
import {CgSortAz} from 'react-icons/cg'

const SortIcon = ({sortBy, styles, title, ariaLabel, iconClick}) => {
  const renderIcon = () => {
    switch (sortBy) {
      case SORT_MAP.TITLE_ASC:
        return <BsSortAlphaDown sx={styles} />
      case SORT_MAP.TITLE_DESC:
        return <BsSortAlphaDownAlt sx={styles} />
      case SORT_MAP.DATE_ASC:
        return <BsSortNumericDown sx={styles} />
      case SORT_MAP.DATE_DESC:
        return <BsSortNumericDownAlt sx={styles} />
      default:
        return (
          <CgSortAz
            sx={{
              ...styles,
              fontSize: '35px',
            }}
          />
        )
    }
  }

  return (
    <i title={title} aria-label={ariaLabel} onClick={iconClick}>
      {renderIcon()}
    </i>
  )
}

export default SortIcon
