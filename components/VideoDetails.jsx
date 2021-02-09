import he from 'he'

const VideoDetails = ({data: {id, snippet}}) => {
  return (
    <div>
      <h2>Title: {he.decode(snippet.title)}</h2>
      <p>Description: {he.decode(snippet.description)}</p>
      <h3>Channel: {snippet.channelTitle}</h3>
      <p>
        Video ID:{' '}
        <i>
          <strong>{id.videoId}</strong>
        </i>
      </p>
    </div>
  )
}

export default VideoDetails
