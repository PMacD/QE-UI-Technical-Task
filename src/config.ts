const config = {
  baseUrl: 'https://www.gov.uk/calculate-your-holiday-entitlement',
  browser: process.env.BROWSER || 'chromium',
  defaultTimeout: 60 * 1000,
  runHeadless: false,
  runSlow: 0,
};
export default config;