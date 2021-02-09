import {useState} from 'react'
import axios from 'axios'
import Search from '../components/Search'
import Results from '../components/Results'
import Loader from '../components/Loader'

const Input = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [data, setData] = useState(undefined)
  const [error, setError] = useState(undefined)
  const [loading, setLoading] = useState(false);
  console.log(data)

  const fetchResults = () => {
    if (searchTerm.trim()) {
      setLoading(true)
      axios
        .get('/api/search', {params: {searchTerm}})
        .then((res) => {
          setData(res.data)
        })
        .catch((error) => setError(error))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
      setError('Empty search!')
    }
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div>
      <Search
        searchTerm={searchTerm}
        updateSearch={handleSearch}
        fetchResults={fetchResults}
      />
      {
          loading ? (
              <Loader />
          ) : (
            <Results data={data} error={error} />
          )
      }
    </div>
  )
}

export default Input
