/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from 'theme-ui'
import Icon from './Icon'
import {trackGAEvent} from '../utils/googleAnalytics'
import footerStyles from '../styles/footer.module.scss'

const Footer = () => {
  return (
    <footer
      sx={{
        bg: 'muted',
      }}>
      <div className={footerStyles.footer}>
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
    </footer>
  )
}

export default Footer
