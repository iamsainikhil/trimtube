/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from 'theme-ui'
import Layout from '../components/Layout'
import PlaylistListing from '../components/PlaylistListing'

export default function Playlists() {
  return (
    <Layout
      page='Playlists'
      description={`Check the playlists you have created on TrimTube, a web application that also features a media player which allows the user to trim and loop any portion of a YouTube video with an ability to save the video(s) to a playlist. The app also allows user to delete individual video(s) as well as a playlist.`}>
      <div sx={{bg: 'background'}}>
        <h2
          sx={{
            textAlign: 'center',
            mt: 0,
            mb: 4,
            fontSize: [3, 4, 5],
          }}>
          Playlists
        </h2>
        <PlaylistListing />
      </div>
    </Layout>
  )
}
