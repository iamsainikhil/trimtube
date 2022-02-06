/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from 'theme-ui'
import Alert from './Alert'
import Listing from './Listing'

const Results = ({data, error}) => {
  return (
    <div>
      {error && (
        <Alert
          type='danger'
          message={error?.response?.data?.error?.message || error}
        />
      )}
      {data && (
        <div>
          {data?.items?.length ? (
            <div sx={{my: 5}}>
              <Listing data={data} />
            </div>
          ) : (
            <Alert type='danger' message='No video found!' />
          )}
        </div>
      )}
    </div>
  )
}

export default Results
