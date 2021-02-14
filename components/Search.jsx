/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from 'theme-ui'
import styles from '../styles/search.module.scss'
import {DebounceInput} from 'react-debounce-input'

const Search = ({searchTerm, updateSearch}) => {
  return (
    <div
      sx={{
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {/* <input
        type='text'
        className={styles.searchInput}
        sx={{
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'secondary',
          height: '2rem',
          width: '75%',
          px: 4,
        }}
        placeholder='Search or paste a youtube video link'
        value={searchTerm}
        onChange={updateSearch}
      /> */}
      <DebounceInput
        className={styles.searchInput}
        sx={{
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'secondary',
          height: '2rem',
          width: '75%',
          px: 4,
        }}
        minLength={2}
        debounceTimeout={300}
        placeholder='Search or paste a youtube video link'
        value={searchTerm}
        onChange={updateSearch}
      />
      {/* <button type='submit' onClick={fetchResults}>
        Search
      </button> */}
    </div>
  )
}

export default Search
