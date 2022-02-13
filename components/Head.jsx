import NextHead from 'next/head'
import LogRocket from 'logrocket'

const Head = ({
  children,
  pathUrl,
  title,
  page = 'Home',
  description,
  image,
}) => {
  const twitterHandle = '@iamsainikhil12'
  const siteName = 'TrimTube'
  const pageTitle = `${title ? `${title} | ` : ''}${page} | ${siteName}`
  const metaDescription =
    description ||
    'TrimTube is a web application which allows user to fetch video or a playlist using a YouTube video or playlist link. This app also features a media player that allows the user to trim and loop any portion of a YouTube video with ability to save the video(s) to a playlist(s).'
  const isProd = process.env.NODE_ENV === 'production'
  // Hotjar variables
  const hjid = process.env.NEXT_PUBLIC_HOTJAR_ID
  const hjsv = process.env.NEXT_PUBLIC_HOTJAR_VERSION
  // LogRocket setup
  if (isProd && pathUrl && !pathUrl.includes('notrack')) {
    LogRocket.init(`${process.env.NEXT_PUBLIC_LOGROCKET_ID}`)
  }

  // clear console logs
  isProd && console.clear()
  return (
    <>
      <NextHead>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta httpEquiv='x-ua-compatible' content='ie=edge' />
        <meta name='description' content={metaDescription} />
        <meta
          name='keywords'
          content='YouTube, Media Player, YouTube Trim, YouTube Loop, YouTube Repeat, Playlists, Videos, nextjs, react, google-fonts, scss'
        />
        <meta name='author' content='Sai Nikhil' />
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
        <meta name='msapplication-TileColor' content='#333' />
        <meta name='theme-color' content='#333' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        {/* dynamic update of start_url in manifest json */}
        <link rel='manifest' href={`/api/manifest?url=${pathUrl}`} />
        {/* favicons */}
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#333' />
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
        <link
          rel='icon'
          type='image/png'
          sizes='196x196'
          href='/android-chrome-192x192.png'
        />
        <link
          rel='apple-touch-startup-image'
          href='light/apple-splash-2048-2732.jpg'
          media='(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
        />
        <link
          rel='apple-touch-startup-image'
          href='light/apple-splash-2732-2048.jpg'
          media='(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
        />
        <link
          rel='apple-touch-startup-image'
          href='light/apple-splash-1668-2388.jpg'
          media='(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
        />
        <link
          rel='apple-touch-startup-image'
          href='light/apple-splash-2388-1668.jpg'
          media='(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
        />
        <link
          rel='apple-touch-startup-image'
          href='light/apple-splash-1536-2048.jpg'
          media='(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
        />
        <link
          rel='apple-touch-startup-image'
          href='light/apple-splash-2048-1536.jpg'
          media='(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
        />
        <link
          rel='apple-touch-startup-image'
          href='light/apple-splash-1668-2224.jpg'
          media='(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
        />
        <link
          rel='apple-touch-startup-image'
          href='light/apple-splash-2224-1668.jpg'
          media='(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
        />
        <link
          rel='apple-touch-startup-image'
          href='light/apple-splash-1620-2160.jpg'
          media='(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
        />
        <link
          rel='apple-touch-startup-image'
          href='light/apple-splash-2160-1620.jpg'
          media='(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
        />
        <link
          rel='apple-touch-startup-image'
          href='light/apple-splash-1284-2778.jpg'
          media='(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
        />
        <link
          rel='apple-touch-startup-image'
          href='light/apple-splash-2778-1284.jpg'
          media='(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
        />
        <link
          rel='apple-touch-startup-image'
          href='light/apple-splash-1170-2532.jpg'
          media='(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
        />
        <link
          rel='apple-touch-startup-image'
          href='light/apple-splash-2532-1170.jpg'
          media='(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
        />
        <link
          rel='apple-touch-startup-image'
          href='light/apple-splash-1125-2436.jpg'
          media='(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
        />
        <link
          rel='apple-touch-startup-image'
          href='light/apple-splash-2436-1125.jpg'
          media='(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
        />
        <link
          rel='apple-touch-startup-image'
          href='light/apple-splash-1242-2688.jpg'
          media='(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
        />
        <link
          rel='apple-touch-startup-image'
          href='light/apple-splash-2688-1242.jpg'
          media='(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
        />
        <link
          rel='apple-touch-startup-image'
          href='light/apple-splash-828-1792.jpg'
          media='(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
        />
        <link
          rel='apple-touch-startup-image'
          href='light/apple-splash-1792-828.jpg'
          media='(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
        />
        <link
          rel='apple-touch-startup-image'
          href='light/apple-splash-1242-2208.jpg'
          media='(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
        />
        <link
          rel='apple-touch-startup-image'
          href='light/apple-splash-2208-1242.jpg'
          media='(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
        />
        <link
          rel='apple-touch-startup-image'
          href='light/apple-splash-750-1334.jpg'
          media='(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
        />
        <link
          rel='apple-touch-startup-image'
          href='light/apple-splash-1334-750.jpg'
          media='(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
        />
        <link
          rel='apple-touch-startup-image'
          href='light/apple-splash-640-1136.jpg'
          media='(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
        />
        <link
          rel='apple-touch-startup-image'
          href='light/apple-splash-1136-640.jpg'
          media='(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
        />
        <link
          rel='apple-touch-startup-image'
          href='dark/apple-splash-dark-2048-2732.jpg'
          media='(prefers-color-scheme: dark) and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
        />
        <link
          rel='apple-touch-startup-image'
          href='dark/apple-splash-dark-2732-2048.jpg'
          media='(prefers-color-scheme: dark) and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
        />
        <link
          rel='apple-touch-startup-image'
          href='dark/apple-splash-dark-1668-2388.jpg'
          media='(prefers-color-scheme: dark) and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
        />
        <link
          rel='apple-touch-startup-image'
          href='dark/apple-splash-dark-2388-1668.jpg'
          media='(prefers-color-scheme: dark) and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
        />
        <link
          rel='apple-touch-startup-image'
          href='dark/apple-splash-dark-1536-2048.jpg'
          media='(prefers-color-scheme: dark) and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
        />
        <link
          rel='apple-touch-startup-image'
          href='dark/apple-splash-dark-2048-1536.jpg'
          media='(prefers-color-scheme: dark) and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
        />
        <link
          rel='apple-touch-startup-image'
          href='dark/apple-splash-dark-1668-2224.jpg'
          media='(prefers-color-scheme: dark) and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
        />
        <link
          rel='apple-touch-startup-image'
          href='dark/apple-splash-dark-2224-1668.jpg'
          media='(prefers-color-scheme: dark) and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
        />
        <link
          rel='apple-touch-startup-image'
          href='dark/apple-splash-dark-1620-2160.jpg'
          media='(prefers-color-scheme: dark) and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
        />
        <link
          rel='apple-touch-startup-image'
          href='dark/apple-splash-dark-2160-1620.jpg'
          media='(prefers-color-scheme: dark) and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
        />
        <link
          rel='apple-touch-startup-image'
          href='dark/apple-splash-dark-1284-2778.jpg'
          media='(prefers-color-scheme: dark) and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
        />
        <link
          rel='apple-touch-startup-image'
          href='dark/apple-splash-dark-2778-1284.jpg'
          media='(prefers-color-scheme: dark) and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
        />
        <link
          rel='apple-touch-startup-image'
          href='dark/apple-splash-dark-1170-2532.jpg'
          media='(prefers-color-scheme: dark) and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
        />
        <link
          rel='apple-touch-startup-image'
          href='dark/apple-splash-dark-2532-1170.jpg'
          media='(prefers-color-scheme: dark) and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
        />
        <link
          rel='apple-touch-startup-image'
          href='dark/apple-splash-dark-1125-2436.jpg'
          media='(prefers-color-scheme: dark) and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
        />
        <link
          rel='apple-touch-startup-image'
          href='dark/apple-splash-dark-2436-1125.jpg'
          media='(prefers-color-scheme: dark) and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
        />
        <link
          rel='apple-touch-startup-image'
          href='dark/apple-splash-dark-1242-2688.jpg'
          media='(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
        />
        <link
          rel='apple-touch-startup-image'
          href='dark/apple-splash-dark-2688-1242.jpg'
          media='(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
        />
        <link
          rel='apple-touch-startup-image'
          href='dark/apple-splash-dark-828-1792.jpg'
          media='(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
        />
        <link
          rel='apple-touch-startup-image'
          href='dark/apple-splash-dark-1792-828.jpg'
          media='(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
        />
        <link
          rel='apple-touch-startup-image'
          href='dark/apple-splash-dark-1242-2208.jpg'
          media='(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
        />
        <link
          rel='apple-touch-startup-image'
          href='dark/apple-splash-dark-2208-1242.jpg'
          media='(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
        />
        <link
          rel='apple-touch-startup-image'
          href='dark/apple-splash-dark-750-1334.jpg'
          media='(prefers-color-scheme: dark) and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
        />
        <link
          rel='apple-touch-startup-image'
          href='dark/apple-splash-dark-1334-750.jpg'
          media='(prefers-color-scheme: dark) and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
        />
        <link
          rel='apple-touch-startup-image'
          href='dark/apple-splash-dark-640-1136.jpg'
          media='(prefers-color-scheme: dark) and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
        />
        <link
          rel='apple-touch-startup-image'
          href='dark/apple-splash-dark-1136-640.jpg'
          media='(prefers-color-scheme: dark) and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
        />
        <title>{pageTitle}</title>
        {/* Global site tag (gtag.js) - Google Analytics  */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <script
          async
          defer
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
              
                gtag('config', ${process.env.NEXT_PUBLIC_GA_ID});`,
          }}
        />
        {/* Hotjar Tracking Code */}
        {isProd ? (
          <script
            async
            defer
            dangerouslySetInnerHTML={{
              __html: `(function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:${hjid},hjsv:${hjsv}};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
            }}
          />
        ) : null}
        {children}
      </NextHead>
    </>
  )
}
export default Head
