import { getOSInfo } from '../utils.js';

export function getOs(elements) {
    const userAgent = navigator.userAgent;
    const os = getOSInfo(userAgent);
    elements.os.textContent = os;
}
