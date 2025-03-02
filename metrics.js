import { getBrowserInfo, getOSInfo } from './utils.js';

export async function getIP(elements) {
    try {
        const response = await fetch("https://api64.ipify.org?format=json");
        const data = await response.json();
        elements.ip.textContent = data.ip;
    } catch (error) {
        elements.ip.textContent = "Error getting IP";
    }
}

export async function getIPv6(elements) {
    try {
        const response = await fetch("https://api64.ipify.org?format=json&ipv6=true");
        const data = await response.json();
        elements.ipv6.textContent = data.ip;
    } catch (error) {
        elements.ipv6.textContent = "Error getting IPv6";
    }
}

export function getBrowser(elements) {
    const userAgent = navigator.userAgent;
    const browser = getBrowserInfo(userAgent);
    elements.browser.textContent = browser;
}

export function getOS(elements) {
    const userAgent = navigator.userAgent;
    const os = getOSInfo(userAgent);
    elements.os.textContent = os;
}

export function getLoadTime(elements) {
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    elements.loadTime.textContent = `${loadTime} ms`;
}

export function getScreenResolution(elements) {
    const screenResolution = `${window.screen.width} x ${window.screen.height}`;
    elements.screenResolution.textContent = screenResolution;
}

export function getLanguage(elements) {
    const language = navigator.language || navigator.userLanguage;
    elements.language.textContent = language;
}

export function getPlatform(elements) {
    elements.platform.textContent = navigator.platform;
}

export function getCookiesEnabled(elements) {
    elements.cookiesEnabled.textContent = navigator.cookieEnabled ? "Yes" : "No";
}

export function getSystemTime(elements) {
    const systemTime = new Date().toLocaleString();
    const systemTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    elements.systemTime.textContent = `${systemTime} (${systemTimezone})`;
}

export function getBrowserTime(elements) {
    const browserTime = new Date().toLocaleString();
    const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    elements.browserTime.textContent = `${browserTime} (${browserTimezone})`;
}

export function getUserAgent(elements) {
    elements.userAgent.textContent = navigator.userAgent;
}

export function getReferrer(elements) {
    elements.referrer.textContent = document.referrer || "No referrer";
}

export function getJsEnabled(elements) {
    elements.jsEnabled.textContent = "Yes";
}

export function getUptime(elements) {
    chrome.runtime.sendMessage({ action: "getUptime" }, response => {
        const uptime = response.uptime;
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = uptime % 60;
        elements.uptime.textContent = `${hours}h ${minutes}m ${seconds}s`;
    });
}

export function getTabsCount(elements) {
    chrome.tabs.query({}, function(tabs) {
        elements.tabsCount.textContent = tabs.length;
    });
}

export function getLastUpdate(elements) {
    const lastUpdate = new Date(document.lastModified).toLocaleString();
    elements.lastUpdate.textContent = lastUpdate;
}
