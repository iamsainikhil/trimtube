/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from 'theme-ui'
import Error from './Error'
import Listing from './Listing'

const Results = ({data, error}) => {
  return (
    <div>
      {error && (
        <Error
          message={
            error?.response?.data?.error?.message ||
            'Something went wrong. Please try again!'
          }
        />
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
