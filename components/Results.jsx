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
          {data.items && data.items.length ? (
            <div>
              <h3
                sx={{
                  textAlign: 'center',
                  my: 5,
                  fontSize: [3, 4, 5],
                }}>
                Videos
              </h3>
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
