const siteUrl = (slug) => {
  const url =
    process.env.NODE_ENV === 'production'
      ? process.env.VERCEL_URL || '/'
      : 'http://localhost:3000'
  return `${url}${slug || ''}`
}

export default siteUrl
