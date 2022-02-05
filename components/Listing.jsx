/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx, useThemeUI} from 'theme-ui'
import styled from '@emotion/styled'
import {default as NextLink} from 'next/link'
import VideoDetails from './VideoDetails'

const Listing = ({data}) => {
  const {theme} = useThemeUI()

  const GridLayout = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, 325px);
    grid-template-rows: auto;
    grid-gap: 1.25rem;
    justify-content: center;
    margin: auto;
  `

  const VideoCard = styled.div`
    display: grid;
    grid-template-columns: 325px;
    grid-template-rows: 200px auto;
    grid-gap: 0;
    margin: 0 auto;
    border-radius: 25px;
    cursor: pointer;
    box-shadow: inset -5px -5px 12px ${theme.colors.shade1},
      inset 5px 5px 12px ${theme.colors.shade2};
  `
  return (
    <GridLayout>
      {data.items.map((item, index) => (
        <NextLink
          href={{
            pathname: '/video',
            // search data yields video with id has an object with a videoId key
            // videos data yields video with simple id as a key
            query: {id: item.id.videoId || item.id},
          }}
          passHref
          key={index}>
          <a>
            <VideoCard>
              <VideoDetails data={item} />
            </VideoCard>
          </a>
        </NextLink>
      ))}
    </GridLayout>
  )
}

export default Listing
