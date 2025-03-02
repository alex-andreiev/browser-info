import { getOSInfo } from '../utils.js';

export function getOS(elements) {
    const userAgent = navigator.userAgent;
    const os = getOSInfo(userAgent);
    elements.os.textContent = os;
}
