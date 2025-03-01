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
