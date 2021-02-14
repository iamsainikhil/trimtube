/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from 'theme-ui'
import VideoDetails from './VideoDetails'

const Results = ({data, error}) => {
  console.log(data)
  return (
    <div>
      {error && (
        // <div
        //   sx={{
        //     textAlign: 'center',
        //     mt: 2,
        //     fontSize: [3, 4, 5],
        //   }}>
        //   {error.message}
        // </div>
        <div
          sx={{
            width: '70%', // almost same width as the input field in Search.jsx
            mx: 'auto',
            mt: 3,
            py: 2,
            px: 3,
            backgroundColor: 'danger',
            color: 'secondary',
            borderLeftWidth: '4px',
            borderLeftStyle: 'solid',
            borderLeftColor: 'dangerBorder',
            fontSize: [2, 3],
            fontFamily: 'light',
          }}>
          {error.message || error}
        </div>
      )}
      {data && (
        <div>
          {data.items && (
            <div>
              <h3
                sx={{
                  textAlign: 'center',
                  mt: 4,
                  mb: 2,
                  fontSize: [3, 4, 5],
                }}>
                Videos
              </h3>
              {data.items.map((item, index) => (
                <VideoDetails key={index} data={item} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Results
