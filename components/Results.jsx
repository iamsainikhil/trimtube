/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from 'theme-ui'
import Alert from './Alert'
import Listing from './Listing'

const Error = ({message}) => (
  <div
    sx={{
      width: '75%',
      maxWidth: '1280px',
      mx: 'auto',
    }}>
    <Alert type='danger' message={message} />
  </div>
)

const Results = ({data, error}) => {
  return (
    <div>
      {error && (
        <Error message={error?.response?.data?.error?.message || error} />
      )}
      {data && (
        <div>
          {data?.items?.length ? (
            <div sx={{my: 5}}>
              <Listing data={data} />
            </div>
          ) : (
            <Error message='No video found!' />
          )}
        </div>
      )}
    </div>
  )
}

export default Results
