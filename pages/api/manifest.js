const manifest_json = {
  name: 'TrimTube',
  short_name: 'TrimTube',
  description:
    'TrimTube is a web application which allows the user to search for YouTube videos or paste any YouTube video link. This app also features a media player that allows the user to trim and loop any portion of a YouTube video with ability to save the video(s) to a playlist.',
  start_url: '/',
  theme_color: '#000',
  background_color: '#222',
  display: 'minimal-ui',
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
  const {url} = req.query
  manifest_json.start_url = url.includes('?')
    ? `${url}&feature=pwa`
    : `${url}?feature=pwa`
  res.status(200).json(manifest_json)
}
