import Layout from '../components/Layout'
import dayjs from 'dayjs'

export default function Playlists() {
  const playlists = JSON.parse(localStorage.getItem('playlists')) || {}
  return (
    <Layout>
      {Object.keys(playlists).length ? (
        <div>
          {Object.keys(playlists).map((name, index) => {
            return (
              <div key={index}>
                <p>{name}</p>
                <p>{dayjs(playlists[name].created).format('MMM D, YYYY')}</p>
              </div>
            )
          })}
        </div>
      ) : (
        <div style={{textAlign: 'center'}}>No Playlist found.</div>
      )}
    </Layout>
  )
}
