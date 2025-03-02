import { ACRONYMS } from './constants.js';

export function getBrowserInfo(userAgent) {
    if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) {
        return `Google Chrome ${navigator.appVersion.match(/Chrome\/(\d+\.\d+)/)[1]}`;
    } else if (userAgent.includes("Firefox")) {
        return `Mozilla Firefox ${navigator.appVersion.match(/Firefox\/(\d+\.\d+)/)[1]}`;
    } else if (userAgent.includes("Edg")) {
        return `Microsoft Edge ${navigator.appVersion.match(/Edg\/(\d+\.\d+)/)[1]}`;
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
    if (ACRONYMS.includes(key)) {
        suffix = key.charAt(0).toUpperCase() + key.charAt(1).toUpperCase() + key.slice(2);
    } else {
        suffix = key.charAt(0).toUpperCase() + key.slice(1);
    }
    return prefix + suffix;
}

export function generateLabel(key) {
    if (ACRONYMS.includes(key)) {
        return key.charAt(0).toUpperCase() + key.charAt(1).toUpperCase() + key.slice(2);
    }
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
}
