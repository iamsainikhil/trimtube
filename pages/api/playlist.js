import axios from 'axios'
import playlistData from '../../constants/playlistData'

const playlist = async (req, res) => {
  const {id} = req.query
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=50&playlistId=${id}&key=${process.env.YOUTUBE_API_V3}`
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
