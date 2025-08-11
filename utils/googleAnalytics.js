
import GA4React from 'ga-4-react';

let ga4Instance = null;
let ga4InitPromise = null;

export const initGA = () => {
  if (!ga4InitPromise && process.env.NEXT_PUBLIC_GA_ID && process.env.NODE_ENV === 'production') {
    const ga4react = new GA4React(
      process.env.NEXT_PUBLIC_GA_ID,
      {},
      [],
      5000
    );
    ga4InitPromise = ga4react.initialize().then((ga) => {
      ga4Instance = ga;
      return ga;
    }).catch(() => {
      ga4Instance = null;
    });
  }
  return ga4InitPromise;
};

export const trackGAEvent = async (category, action, label, value = 0) => {
  if (process.env.NODE_ENV !== 'production') return;
  if (!ga4InitPromise) {
    initGA();
  }
  try {
    await ga4InitPromise;
    if (ga4Instance && typeof window.gtag === 'function') {
      window.gtag('event', action, { category, label, value });
    }
  } catch (e) {
    // GA not initialized
  }
};
