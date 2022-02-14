/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx, useThemeUI} from 'theme-ui'
import {default as NextLink} from 'next/link'
import {useRouter} from 'next/router'
import Headroom from 'react-headroom'
import {GoSearch} from 'react-icons/go'
import {FiHelpCircle, FiSun, FiMoon} from 'react-icons/fi'
import {RiPlayListFill} from 'react-icons/ri'
import {trackGAEvent} from '../utils/googleAnalytics'

const Header = () => {
  const {colorMode, setColorMode} = useThemeUI()
  const router = useRouter()
  const {asPath: routePath} = router
  const iconStyle = {
    verticalAlign: 'middle',
    p: '6px',
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
          <div
            sx={{
              m: 0,
              variant: 'textStyles.title',
              fontSize: ['2rem', 6],
            }}>
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
                <img
                  src='/logo.png'
                  alt='TrimTube Logo'
                  sx={{
                    mb: '-10px',
                    width: 50,
                    height: 50,
                  }}
                />
                <span
                  sx={{
                    mx: 2,
                    display: 'none',
                    '@media (min-width: 40rem)': {
                      display: 'inline-block',
                    },
                  }}>
                  TrimTube
                </span>
              </a>
            </NextLink>
          </div>
          <div className='header-links'>
            {routePath !== '/' && (
              <p>
                <GoSearch
                  title='Search'
                  sx={{
                    fontSize: '1.75rem',
                    ...iconStyle,
                    marginTop: '1rem',
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
            )}
            {routePath !== '/playlists' && (
              <p>
                <NextLink href={'/playlists'} passHref>
                  <a>
                    <RiPlayListFill
                      title='Playlists'
                      sx={{
                        fontSize: '1.85rem',
                        ...iconStyle,
                      }}
                    />
                  </a>
                </NextLink>
              </p>
            )}
            {routePath !== '/help' && (
              <p>
                <NextLink href={'/help'} passHref>
                  <a>
                    <FiHelpCircle
                      title='About'
                      sx={{
                        fontSize: '2rem',
                        ...iconStyle,
                      }}
                    />
                  </a>
                </NextLink>
              </p>
            )}
            <p>
              {colorMode !== 'dark' ? (
                <span
                  title='Switch to Dark Mode'
                  aria-label='Switch to Dark Mode'>
                  <FiSun
                    sx={{
                      fontSize: '2rem',
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
                      fontSize: '2rem',
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
