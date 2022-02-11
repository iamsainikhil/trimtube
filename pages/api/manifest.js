const manifest_json = {
  name: 'TrimTube',
  short_name: 'TrimTube',
  description:
    'TrimTube is a web application which allows the user to search for YouTube videos or paste any YouTube video link. This app also features a media player that allows the user to trim and loop any portion of a YouTube video with ability to save the video(s) to a playlist.',
  start_url: '/',
  theme_color: '#333',
  background_color: '#161819',
  display: 'standalone',
  orientation: 'any',
  icons: [
    {
      src: '/android-chrome-192x192.png',
      sizes: '192x192',
      type: 'image/png',
      purpose: 'maskable any',
    },
    {
      src: '/android-chrome-384x384.png',
      sizes: '384x384',
      type: 'image/png',
      purpose: 'maskable any',
    },
    {
      src: '/manifest-icon-512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'maskable any',
    },
  ],
}

export default function manifest(req, res) {
  const {url, ...params} = req.query
  let questionExist = url.includes('?')
  let startUrl = url
  Object.keys(params).forEach((param) => {
    const slug = `${param}=${params[param]}`
    if (questionExist) {
      startUrl += `&${slug}`
    } else {
      startUrl += `?${slug}`
      questionExist = true
    }
  })
  manifest_json.start_url = startUrl.includes('?')
    ? `${startUrl}&feature=pwa`
    : `${startUrl}?feature=pwa`
  res.status(200).json(manifest_json)
}
