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
import {BiSort} from 'react-icons/bi'

const SortIcon = ({sortBy, styles, title, ariaLabel, iconClick}) => {
  const renderIcon = () => {
    switch (sortBy) {
      case SORT_MAP.TITLE_ASC:
        return <BsSortAlphaDown sx={styles} />
      case SORT_MAP.TITLE_DESC:
        return <BsSortAlphaDownAlt sx={styles} />
      case SORT_MAP.DATE_ASC:
        return <BsSortNumericDownAlt sx={styles} />
      case SORT_MAP.DATE_DESC:
        return <BsSortNumericDown sx={styles} />
      default:
        return <BiSort sx={styles} />
    }
  }

  return (
    <i title={title} aria-label={ariaLabel} onClick={iconClick}>
      {renderIcon()}
    </i>
  )
}

export default SortIcon
