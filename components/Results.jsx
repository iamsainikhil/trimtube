import VideoDetails from './VideoDetails'

const Results = ({data, error}) => {
  console.log(data)
  return (
    <div>
      {error && <div>{error.message}</div>}
      {data && (
        // <div>
        //   {data.items &&
        //     data.items.map((item, index) => (
        //       <VideoDetails key={index} data={item} />
        //     ))}
        // </div>
        <div>{data}</div>
      )}
    </div>
  )
}

export default Results
