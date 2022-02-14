/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from 'theme-ui'
import Image from 'next/image'

const isOddValue = (n) => n % 2 !== 0

const Step = ({position, data}) => {
  const {title, link, content} = data
  const isOdd = isOddValue(position)
  return (
    <div
      sx={{
        bg: isOdd ? 'muted' : 'background',
        py: 2,
      }}>
      <h2 sx={{textAlign: 'center', py: 3}}>{title}</h2>
      <div
        sx={{
          display: 'flex',
          flexWrap: 'nowrap',
          flexDirection: isOdd ? 'column' : 'column-reverse',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: '1080px',
          my: 2,
          mx: 'auto',
          px: 1,
          pb: 4,
          '@media (min-width: 48rem)': {
            flexDirection: isOdd ? 'row' : 'row-reverse',
            justifyContent: 'space-between',
          },
        }}>
        <div>
          <iframe
            height='360'
            width='640'
            src={link}
            title={title}
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          />
          {/* <Image
            unoptimized
            src='https://raw.githubusercontent.com/iamsainikhil/trimtube/main/README/Playlists_Demo.gif'
            alt={`${title} Section Image`}
            width='640'
            height='360'
            layout='fixed'
          /> */}
        </div>
        <div
          sx={{
            mx: 2,
            maxWidth: '400px',
            variant: 'styles',
          }}
          dangerouslySetInnerHTML={{__html: content}}></div>
      </div>
    </div>
  )
}

export default Step
