let playlistData
// ex - https://www.youtube.com/watch?v=aquTeAH_C4I&list=RDaquTeAH_C4I&start_radio=1 result in a endless loop of nextPlayTokens [EAAaFVBUOkVndEJWRFJWU0RGUGEzZERhdw, EAAaFVBUOkVndGFNVzlDTWtWRWRUVllRUQ]
// important to stop fetching playlist videos when
// 1. totalResults <= 50
// 2. when there is no nextPageToken
// 3. a nextPageToken was already used
// 4. when count is 6 i.e. 300 videos
let nextPageTokens = {}
let count = 0

/**
 *
 * @param {Object} data
 * @param {Function} callbackFn which accepts nextPageToken
 * @returns {Object}
 */
const recursivePlaylistData = (data, callbackFn) => {
  if (!playlistData) {
    playlistData = data
  } else {
    playlistData = {
      ...playlistData,
      items: [...(playlistData?.items || []), ...(data?.items || [])],
    }
  }
  const updateAndBreak = () => {
    const result = {...playlistData}
    playlistData = {}
    nextPageTokens = {}
    count = 0
    return result
  }

  if (data?.pageInfo?.totalResults > 50) {
    // break case
    if (
      !data?.nextPageToken ||
      nextPageTokens[data?.nextPageToken] ||
      count === 6
    ) {
      return updateAndBreak()
    }
    // recursion
    nextPageTokens[data.nextPageToken] = data.nextPageToken
    count++
    callbackFn(data.nextPageToken)
  } else {
    return updateAndBreak()
  }
}

export default recursivePlaylistData
