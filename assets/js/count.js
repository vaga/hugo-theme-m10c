/*! Diet Goat (lightweight GoatCounter client) */

/**
 * GoatCounter data parameters
 * @typedef GoatData
 * @property {string} p Page path or event name
 * @property {string} [t] Page title
 * @property {string} [r] Referrer
 * @property {boolean} [e] Treat the path as an event
 * @property {string} [q] Query parameters
 * @property {[number, number, number]} [s] Screen size, as [width, height, scale]
 * @property {number} [b] Flag this as a "bot request"
 */

/**
 * Infer page path from the URL.
 * @returns {string} page path
 */
const getPath = () => {
  /** @type {Location | URL} */
  let location = window.location;

  /** @type {HTMLLinkElement|null} */
  const canonicalUrl = document.querySelector('link[rel="canonical"][href]');
  if (canonicalUrl) {
    // May be relative or point to different domain.
    const url = new URL(canonicalUrl.href);

    if (
      url.hostname.replace(/^www\./, "") ===
      location.hostname.replace(/^www\./, "")
    )
      location = url;
  }

  return location.pathname + location.search || "/";
};

/**
 * See if the browser looks like a bot.
 *
 * There is some additional filtering on the backend, but these properties
 * can't be fetched from there.
 * @returns {number} bot type constant from the zgo.at/isbot library
 */
const isBot = () => {
  // Headless browsers are probably a bot.
  if (window.callPhantom || window._phantom || window.phantom) return 150; // Phantom
  if (window.__nightmare) return 151; // Nightmare
  if (
    document.__selenium_unwrapped ||
    document.__webdriver_evaluate ||
    document.__driver_evaluate
  )
    return 152; // Selenium
  if (navigator.webdriver) return 153; // generic WebDriver
  return 0; // no bot detected
};

/**
 * Get all data we're going to send off to the counter endpoint.
 * @param {Partial<GoatData>} [variables] preset data parameters that will be merged into the final one
 * @returns {GoatData} data to be sent
 */
const getData = (variables = {}) => {
  return {
    p: variables?.p ?? getPath(),
    r: variables?.r ?? document.referrer,
    t: variables?.t ?? document.title,
    e: !!variables?.e,
    q: window.location.search,
    s: [
      window.screen.width,
      window.screen.height,
      window.devicePixelRatio || 1,
    ],
    b: isBot(),
  };
};

/**
 * Check if the visit should be counted
 * @returns {boolean} whether the visit should be counted
 */
const shouldCount = () => {
  return (
    // @ts-ignore: not standard property
    document.visibilityState !== "prerender" && // prerender
    window.location === window.parent.location && // iframe
    !/(localhost$|^127\.|^10\.|^172\.(1[6-9]|2\d|3[01])\.|^192\.168\.|^0\.0\.0\.0$)/.test(
      window.location.hostname,
    ) && // localhost
    window.location.protocol !== "file:" && // local file
    localStorage?.getItem("skipgc") !== "t" // opted out
  );
};

/**
 * Count the visit.
 * @param  {string} endpoint GoatCounter API endpoint
 * @param {Partial<GoatData>} [variables] preset data parameters that will be merged into the final one
 */
export const count = (endpoint, variables = {}) => {
  if (!endpoint) return;

  // Don't bother if we can't send beacons
  if (!navigator.sendBeacon) return;

  if (!shouldCount()) return;

  const url = new URL(endpoint);
  for (const [k, v] of Object.entries(getData(variables))) {
    if (v)
      url.searchParams.append(
        k,
        // @ts-ignore
        v,
      );
  }
  navigator.sendBeacon(url);
};
