/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from 'theme-ui'
import Layout from '../components/Layout'
import Sections from './../components/Sections'

export default function Help() {
  return (
    <Layout
      page='Help'
      description={`Learn how to use the TrimTube application and become a power user of the app.`}>
      <div sx={{bg: 'background'}}>
        <h2
          sx={{
            textAlign: 'center',
            mt: 0,
            mb: 4,
            fontSize: [3, 4, 5],
          }}>
          How to use TrimTube?
        </h2>
        <Sections />
      </div>
    </Layout>
  )
}
