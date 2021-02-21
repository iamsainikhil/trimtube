import axios from 'axios'
import videoData from '../../constants/videoData'

const video = async (req, res) => {
  const {id} = req.query
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${id}&maxResults=50&key=${process.env.YOUTUBE_API_V3}`
    )
    res.status(200).json(response.data)
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).send(error.response.data)
    }
    res.send(error)
  }
  //res.status(200).json(videoData)
}

export default video
