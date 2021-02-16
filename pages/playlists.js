/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from 'theme-ui'
import Layout from '../components/Layout'
import PlaylistListing from '../components/PlaylistListing'

export default function Playlists() {
  return (
    <Layout page='Playlists'>
      <div sx={{bg: 'background'}}>
        <h3
          sx={{
            textAlign: 'center',
            mt: 0,
            mb: 4,
            fontSize: [3, 4, 5],
          }}>
          Playlists
        </h3>
        <PlaylistListing />
      </div>
    </Layout>
  )
}
