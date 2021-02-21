import {Fragment, useEffect, useState} from 'react'
import {useThemeUI} from 'theme-ui'
import {default as NextLink} from 'next/link'
import styled from '@emotion/styled'
import truncateText from '../utils/truncateText'

const PlaylistListing = () => {
  const {theme} = useThemeUI()
  const [playlists, setPlaylists] = useState({})

  const GridLayout = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, 200px);
    grid-template-rows: auto;
    grid-gap: 1.25rem;
    justify-content: center;
    margin: auto;
  `

  useEffect(() => {
    if (localStorage.getItem('playlists')) {
      setPlaylists(JSON.parse(localStorage.getItem('playlists')))
    }
    return () => {}
  }, [])

  return (
    <Fragment>
      {Object.keys(playlists).length ? (
        <GridLayout>
          {Object.keys(playlists).map((name, index) => {
            return (
              <NextLink
                href={{
                  pathname: '/playlist',
                  query: {id: name},
                }}
                key={index}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row nowrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '25px',
                    cursor: 'pointer',
                    boxShadow: `inset -5px -5px 12px ${theme.colors.shade2},
      inset 5px 5px 12px ${theme.colors.shade1}`,
                  }}>
                  <p title={name} aria-label={name}>
                    {truncateText(name, 10)}
                  </p>
                </div>
              </NextLink>
            )
          })}
        </GridLayout>
      ) : (
        <div style={{textAlign: 'center'}}>No Playlist found.</div>
      )}
    </Fragment>
  )
}

export default PlaylistListing
