import {useState, useEffect} from 'react'
import axios from 'axios'
import Search from '../components/Search'
import Results from '../components/Results'
import Loader from '../components/Loader'

const Input = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [data, setData] = useState(undefined)
  const [error, setError] = useState(undefined)
  const [loading, setLoading] = useState(false)

  const fetchResults = () => {
    if (searchTerm.trim()) {
      setLoading(true)
      axios
        .get('/api/search', {params: {searchTerm}})
        .then((res) => {
          setData(res.data)
          console.log(data)
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

  useEffect(() => {
    fetchResults()
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
