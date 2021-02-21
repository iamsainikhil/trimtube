/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from 'theme-ui'
import {useState, useEffect} from 'react'
import axios from 'axios'
import Search from '../components/Search'
import Results from '../components/Results'
import Loader from '../components/Loader'
import Layout from '../components/Layout'

const Input = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [data, setData] = useState(undefined)
  const [error, setError] = useState(undefined)
  const [loading, setLoading] = useState(false)

  const fetchResults = () => {
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
  }

  const updateDataError = (data, error) => {
    setData(data)
    setError(error)
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  useEffect(() => {
    if (searchTerm.trim()) {
      fetchResults()
    }
    return () => {}
  }, [searchTerm])

  return (
    <Layout title='Search'>
      <div sx={{bg: 'background'}}>
        <h3
          sx={{
            textAlign: 'center',
            mt: 0,
            mb: 4,
            fontSize: [3, 4, 5],
          }}>
          Search
        </h3>
        <Search searchTerm={searchTerm} updateSearch={handleSearch} />
        {loading ? <Loader /> : <Results data={data} error={error} />}
      </div>
    </Layout>
  )
}

export default Input
