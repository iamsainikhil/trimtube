import GA4React from 'ga-4-react'

const ga4react = new GA4React(
  process.env.NEXT_PUBLIC_GA_ID,
  {
    /* ga custom config, optional */
  },
  [
    /* additional code, optional */
  ],
  5000 /* timeout, optional, defaults is 5000 */
)

export const trackGAEvent = (category, action, label, value = 0) => {
  //ga4react.event(action, label, category)
  ga4react.gtag('event', action, {category, label, value})
}
