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
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'secondary',
          borderRadius: '2.5rem',
          height: '2rem',
          width: '75%',
          p: 4,
          fontFamily: 'light',
          fontSize: [3],
          outline: 'none',
        }}
        minLength={1}
        debounceTimeout={300}
        placeholder='Search or paste a youtube video link'
        value={searchTerm}
        onChange={updateSearch}
      />
    </div>
  )
}

export default Search
