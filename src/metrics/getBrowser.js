import { getBrowserInfo } from '../utils.js';

export function getBrowser(elements) {
    const userAgent = navigator.userAgent;
    const browser = getBrowserInfo(userAgent, navigator.appVersion);
    elements.browser.textContent = browser;
}
