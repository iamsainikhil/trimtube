import {useState, useEffect} from 'react'
import useFirstRender from '../hooks/firstRender'
import axios from 'axios'
import Search from '../components/Search'
import Results from '../components/Results'
import Loader from '../components/Loader'

const Input = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [data, setData] = useState(undefined)
  const [error, setError] = useState(undefined)
  const [loading, setLoading] = useState(false)
  const isFirstRender = useFirstRender()

  const fetchResults = () => {
    if (searchTerm.trim()) {
      setLoading(true)
      axios
        .get('/api/search', {params: {searchTerm}})
        .then((res) => {
          updateDataError(res.data, undefined)
        })
        .catch((error) => {
          updateDataError(undefined, error)
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
      updateDataError(undefined, 'No videos found!')
    }
  }

  const updateDataError = (data, error) => {
    setData(data)
    setError(error)
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  useEffect(() => {
    if (!isFirstRender) {
      fetchResults()
    }
    return () => {}
  }, [searchTerm])

  return (
    <div>
      <Search searchTerm={searchTerm} updateSearch={handleSearch} />
      {loading ? <Loader /> : <Results data={data} error={error} />}
    </div>
  )
}

export default Input
