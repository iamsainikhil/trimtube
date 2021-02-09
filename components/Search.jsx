const Search = ({searchTerm, updateSearch, fetchResults}) => {
  return (
    <div>
      <input type='text' value={searchTerm} onChange={updateSearch} />
      <button type='submit' onClick={fetchResults}>
        Search
      </button>
    </div>
  )
}

export default Search
