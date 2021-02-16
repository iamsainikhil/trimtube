import NextHead from 'next/head'
import GoogleFonts from 'next-google-fonts'

const Head = ({
  children,
  pathUrl,
  title,
  page = 'Search',
  description,
  image,
}) => {
  const twitterHandle = '@iamsainikhil12'
  const siteName = 'LoopTube'
  const pageTitle = `${title ? `${title} | ` : ''}${page} | ${siteName}`
  const metaDescription =
    description ||
    'LoopTube is a media player that allows user to trim and loop any portion of a YouTube video.'
  return (
    <>
      <GoogleFonts href='https://fonts.googleapis.com/css2?family=Damion' />
      <NextHead>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta httpEquiv='x-ua-compatible' content='ie=edge' />
        <meta name='description' content={metaDescription} />
        <meta
          name='keywords'
          content='YouTube, Media Player, YouTube Trim, YouTube Loop, YouTube Repeat, Playlists, Videos, nextjs, react, google-fonts, scss'
        />
        <meta name='author' content='Sai Nikhil'></meta>
        {/* Twitter */}
        <meta name='twitter:card' content='summary_large_image' key='twcard' />
        <meta name='twitter:creator' content={twitterHandle} key='twhandle' />
        {/* Open Graph */}
        <meta property='og:type' content='website' key='ogtype' />
        <meta property='og:url' content={pathUrl} key='ogurl' />
        <meta property='og:image' content={image} key='ogimage' />
        <meta property='og:site_name' content={siteName} key='ogsitename' />
        <meta property='og:title' content={pageTitle} key='ogtitle' />
        <meta
          property='og:description'
          content={metaDescription}
          key='ogdesc'
        />
        {/* favicons */}
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
        <meta name='msapplication-TileColor' content='#333' />
        <meta name='theme-color' content='#333' />
        <title>{pageTitle}</title>
        {children}
      </NextHead>
    </>
  )
}
export default Head
