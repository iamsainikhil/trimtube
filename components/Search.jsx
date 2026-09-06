/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from 'theme-ui'

const Search = ({searchTerm, placeholder, updateSearch}) => {
  return (
    <div
      sx={{
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <input
        type='text'
        minLength={1}
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
        placeholder={placeholder}
        value={searchTerm}
        onChange={updateSearch}
      />
    </div>
  )
}

export default Search
