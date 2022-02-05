import axios from 'axios'
import playlistData from '../../constants/PlaylistData'

const playlist = async (req, res) => {
  const {searchTerm} = req.query
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=50&playlistId=${searchTerm}&key=${process.env.YOUTUBE_API_V3}`
    )
    res.status(200).json(response.data)
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).send(error.response.data)
    }
    res.send(error)
  }
  //res.status(200).json(playlistData)
}

export default playlist
