import axios from 'axios'
// import searchData from '../../constants/searchData'

const search = async (req, res) => {
  const {searchTerm} = req.query
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${searchTerm}&type=video&key=${process.env.YOUTUBE_API_V3}`
    )
    res.status(200).json(response.data)
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).send(error.response.data)
    }
    res.send(error)
  }
  // res.status(200).json(searchData)
}

export default search
