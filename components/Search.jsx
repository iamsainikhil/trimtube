/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from 'theme-ui'
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
      <DebounceInput
        sx={{
          bg: 'search',
          color: 'text',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'search',
          borderRadius: '2.5rem',
          height: '2rem',
          width: '75%',
          maxWidth: '1280px',
          p: 4,
          fontFamily: 'light',
          fontSize: [2, 3, 4],
          outline: 'none',
        }}
        minLength={1}
        debounceTimeout={300}
        placeholder='Type something or paste a youtube video link'
        value={searchTerm}
        onChange={updateSearch}
      />
    </div>
  )
}

export default Search
