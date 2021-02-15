// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// process.env.YOUTUBE_API_V3
import axios from 'axios'
import SearchData from '../../constants/SearchData'

const search = (req, res) => {
  // const {searchTerm} = req.query
  // axios
  //   .get(
  //     `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${searchTerm}&type=video&key=${process.env.YOUTUBE_API_V3}`
  //   )
  //   .then((response) => res.status(200).json(response.data))
  //   .catch((error) => {
  //     if (error.response) {
  //       res.status(error.response.status).send(error.response.data)
  //     }
  //     res.send(error)
  //   })
  res.status(200).json(SearchData)
}

export default search
