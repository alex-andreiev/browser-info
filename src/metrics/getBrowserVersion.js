import { BROWSER_REGEXES } from '../constants.js';

export function getBrowserVersion(elements) {
    const version = navigator.appVersion.match(BROWSER_REGEXES.chrome)[1];
    elements.browserVersion.textContent = version;
}
