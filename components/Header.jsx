/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx, useThemeUI} from 'theme-ui'
import {default as NextLink} from 'next/link'
import Headroom from 'react-headroom'
import {GoSearch} from 'react-icons/go'
import {FiHelpCircle, FiSun, FiMoon} from 'react-icons/fi'
import {MdPlaylistPlay} from 'react-icons/md'
import {trackGAEvent} from '../utils/googleAnalytics'
import {useRouter} from 'next/router'

const Header = () => {
  const {colorMode, setColorMode} = useThemeUI()
  const router = useRouter()
  const {asPath: routePath} = router
  const iconStyle = {
    verticalAlign: 'middle',
    mt: '0.7rem',
    cursor: 'pointer',
    '&:hover': {
      borderRadius: '50%',
      bg: 'shade2',
    },
  }

  return (
    <Headroom disableInlineStyles upTolerance={10} downTolerance={10}>
      <header sx={{bg: 'muted'}} className='header'>
        <div className='header-content'>
          <div>
            <h1 style={{margin: '0', variant: 'styles.h1'}}>
              <NextLink href='/' passHref>
                <a
                  sx={{
                    variant: 'styles.a',
                    textDecoration: 'none',
                    fontFamily: `'Damion', 'Lato', -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif`,
                    letterSpacing: '0.15rem',
                  }}
                  onClick={() =>
                    trackGAEvent('logo', `clicked on site logo`, 'link click')
                  }
                  rel='noreferrer noopener'>
                  TrimTube
                </a>
              </NextLink>
            </h1>
          </div>
          <div className='header-links'>
            {routePath !== '/' ? (
              <p>
                <GoSearch
                  title='Search'
                  sx={{
                    p: '6px',
                    fontSize: '1.85rem',
                    verticalAlign: 'middle',
                    marginTop: '0.8rem',
                    ...iconStyle,
                  }}
                  onClick={() => {
                    trackGAEvent(
                      'search',
                      `clicked on search icon`,
                      'icon click'
                    )
                    router.push('/')
                  }}
                />
              </p>
            ) : null}
            {routePath !== '/playlists' ? (
              <p>
                <NextLink href={'/playlists'} passHref>
                  <a>
                    <MdPlaylistPlay
                      title='Playlists'
                      sx={{
                        p: '2px',
                        fontSize: '2rem',
                        ...iconStyle,
                      }}
                    />
                  </a>
                </NextLink>
              </p>
            ) : null}
            <p>
              <a
                href='https://github.com/iamsainikhil/trimtube#--trimtube'
                target='_blank'
                rel='noopener noreferrer'>
                <FiHelpCircle
                  title='About'
                  sx={{
                    p: '6px',
                    fontSize: '2rem',
                    verticalAlign: 'middle',
                    marginTop: '0.7rem',
                    ...iconStyle,
                  }}
                />
              </a>
            </p>
            <p>
              {colorMode !== 'dark' ? (
                <span
                  title='Switch to Dark Mode'
                  aria-label='Switch to Dark Mode'>
                  <FiSun
                    sx={{
                      p: '6px',
                      fontSize: '2rem',
                      mt: '0.7rem',
                      verticalAlign: 'middle',
                      ...iconStyle,
                    }}
                    onClick={() => {
                      setColorMode('dark')
                      trackGAEvent(
                        'toggle theme',
                        `enabled dark theme`,
                        'icon click'
                      )
                    }}
                  />
                </span>
              ) : (
                <span
                  title='Switch to Light Mode'
                  aria-label='Switch to Light Mode'>
                  <FiMoon
                    sx={{
                      p: '6px',
                      fontSize: '2rem',
                      mt: '0.7rem',
                      verticalAlign: 'middle',
                      ...iconStyle,
                    }}
                    onClick={() => {
                      setColorMode('light')
                      trackGAEvent(
                        'toggle theme',
                        `enabled light theme`,
                        'icon click'
                      )
                    }}
                  />
                </span>
              )}
            </p>
          </div>
        </div>
      </header>
    </Headroom>
  )
}

export default Header
