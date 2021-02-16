/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from 'theme-ui'
import Layout from '../components/Layout'
import PlaylistListing from '../components/PlaylistListing'

export default function Playlists() {
  return (
    <Layout page='Playlists'>
      <div sx={{bg: 'background'}}>
        <PlaylistListing />
      </div>
    </Layout>
  )
}
