import dayjs from 'dayjs'

/**
 * @returns {String} // ex- '2022-01-17T02:00:00.000Z'
 */
export const dateNow = () => dayjs().toISOString()
