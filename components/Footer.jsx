/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from 'theme-ui'
import {SiNextdotjs} from 'react-icons/si'
import {FaHeart} from 'react-icons/fa'
import Icon from './Icon'
import {trackGAEvent} from '../utils/googleAnalytics'
import footerStyles from '../styles/footer.module.scss'
import {Box, useColorModeValue} from '@chakra-ui/react'

const Footer = () => {
  return (
    <footer>
      <Box bg='mode.muted'>
        <div className={footerStyles.footer}>
          {/* <div className={footerStyles.linksRow}>
          <div>
            <a
              href="https://github.com/iamsainikhil/nextjs-prismic-blog-starter"
              target="_blank"
              rel="noreferrer noopener"
              className="special-link"
              aria-label="GitHub"
              title="GitHub"
              sx={{ color: 'primary' }}
              onClick={() =>
                trackGAEvent(
                  'footer links',
                  `clicked on GitHub link in Footer`,
                  'link click'
                )
              }
            >
              GitHub
            </a>
          </div>
          <div>
            <a
              href="https://iamsainikhil.com/privacy-policy"
              target="_blank"
              rel="noreferrer noopener"
              className="special-link"
              aria-label="Privacy Policy"
              title="Privacy Policy"
              sx={{ color: 'primary' }}
              onClick={() =>
                trackGAEvent(
                  'footer links',
                  `clicked on Privacy Policy link in Footer`,
                  'link click'
                )
              }
            >
              Privacy Policy
            </a>
          </div>
        </div> */}

          <div
            style={{
              textAlign: 'center',
              margin: '0.25rem auto',
              wordSpacing: '0.2rem',
            }}>
            Made with{' '}
            <FaHeart
              style={{color: '#CC3D5C', marginBottom: '-0.25rem'}}
              aria-label='Love'
              title='Love'
            />{' '}
            using{' '}
            <SiNextdotjs
              sx={{
                color: 'text',
                marginBottom: '-0.25rem',
                cursor: 'help',
              }}
              aria-label='NextJS'
              title='NextJS'
            />
          </div>

          <div className={footerStyles.socialRow}>
            <Icon
              name='Twitter'
              url='https://twitter.com/iamsainikhil12'
              style={{
                color: 'primary',
                fontSize: '1.5rem',
              }}
            />

            <Icon
              name='GitHub'
              url='https://github.com/iamsainikhil'
              style={{
                color: 'primary',
                fontSize: '1.5rem',
              }}
            />

            <Icon
              name='LinkedIn'
              url='https://www.linkedin.com/in/iamsainikhil'
              style={{
                color: 'primary',
                fontSize: '1.70rem',
                marginBottom: '0.25rem',
              }}
            />
          </div>

          <p
            style={{
              display: 'flex',
              flexFlow: 'row nowrap',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '0.5rem',
            }}>
            © {new Date().getFullYear()}{' '}
            <a
              href='https://iamsainikhil.com'
              target='_blank'
              rel='noreferrer noopener'
              className='special-link'
              aria-label='Portfolio'
              title='Portfolio'
              sx={{color: 'primary', marginLeft: '0.25rem'}}
              onClick={() =>
                trackGAEvent(
                  'footer links',
                  `clicked on copyright link in Footer`,
                  'text click'
                )
              }>
              Sai&nbsp;Nikhil
            </a>
          </p>
        </div>
      </Box>
    </footer>
  )
}

export default Footer
