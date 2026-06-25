import { ACRONYM_REGEXES, CAPITALIZE_FIRST_REGEX, INSERT_SPACES_REGEX, BROWSER_REGEXES } from './constants.js';

export function getBrowserInfo(userAgent, appVersion = "") {
    if (!userAgent) return "Unknown";
    
    if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) {
        const match = appVersion.match(BROWSER_REGEXES.chrome);
        return match ? `Google Chrome ${match[1]}` : "Google Chrome";
    } else if (userAgent.includes("Firefox")) {
        const match = appVersion.match(BROWSER_REGEXES.firefox);
        return match ? `Mozilla Firefox ${match[1]}` : "Mozilla Firefox";
    } else if (userAgent.includes("Edg")) {
        const match = appVersion.match(BROWSER_REGEXES.edge);
        return match ? `Microsoft Edge ${match[1]}` : "Microsoft Edge";
    } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
        return "Safari";
    } else if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
        return "Opera";
    }
    return "Unknown";
}

export function getOSInfo(userAgent) {
    if (userAgent.includes("Windows NT 10.0")) return "Windows 10";
    if (userAgent.includes("Windows NT 6.3")) return "Windows 8.1";
    if (userAgent.includes("Mac OS X")) return "macOS";
    if (userAgent.includes("Linux")) return "Linux";
    if (userAgent.includes("Android")) return "Android";
    if (userAgent.includes("iPhone")) return "iOS";
    return "Unknown";
}

export function generateKey(key, prefix = "") {
    let suffix = key;
    return prefix + suffix.charAt(0).toUpperCase() + suffix.slice(1);
}

export function generateLabel(key) {
    let label = key;
    label = label.replace(INSERT_SPACES_REGEX, ' $1')
                 .replace(CAPITALIZE_FIRST_REGEX, str => str.toUpperCase());
    ACRONYM_REGEXES.forEach(regex => {
        label = label.replace(regex, match => match.toUpperCase());
    });
    return label
}
