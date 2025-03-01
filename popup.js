import { loadSettings, saveSettings, updateTable } from './settings.js';
import { getBrowserInfo, getOSInfo } from './utils.js';

document.addEventListener("DOMContentLoaded", init);

async function init() {
    const ipElement = document.getElementById("ip");
    const ipv6Element = document.getElementById("ipv6");
    const browserElement = document.getElementById("browser");
    const osElement = document.getElementById("os");
    const loadTimeElement = document.getElementById("loadTime");
    const screenResolutionElement = document.getElementById("screenResolution");
    const languageElement = document.getElementById("language");
    const platformElement = document.getElementById("platform");
    const cookiesEnabledElement = document.getElementById("cookiesEnabled");
    const systemTimeElement = document.getElementById("systemTime");
    const browserTimeElement = document.getElementById("browserTime");

    const settings = await loadSettings();

    // Hide all rows initially
    document.querySelectorAll(".info-table tr").forEach(row => {
        row.style.display = "none";
    });

    // Set checkboxes based on settings
    document.getElementById("toggleIP").checked = settings.showIP;
    document.getElementById("toggleIPv6").checked = settings.showIPv6;
    document.getElementById("toggleBrowser").checked = settings.showBrowser;
    document.getElementById("toggleOS").checked = settings.showOS;
    document.getElementById("toggleLoadTime").checked = settings.showLoadTime;
    document.getElementById("toggleScreenResolution").checked = settings.showScreenResolution;
    document.getElementById("toggleLanguage").checked = settings.showLanguage;
    document.getElementById("togglePlatform").checked = settings.showPlatform;
    document.getElementById("toggleCookiesEnabled").checked = settings.showCookiesEnabled;
    document.getElementById("toggleSystemTime").checked = settings.showSystemTime;
    document.getElementById("toggleBrowserTime").checked = settings.showBrowserTime;

    // Get external IP via ipify API
    if (settings.showIP) {
        try {
            const response = await fetch("https://api64.ipify.org?format=json");
            const data = await response.json();
            ipElement.textContent = data.ip;
        } catch (error) {
            ipElement.textContent = "Error getting IP";
        }
        document.getElementById("rowIP").style.display = "table-row";
    }

    // Get external IPv6 via ipify API
    if (settings.showIPv6) {
        try {
            const response = await fetch("https://api64.ipify.org?format=json&ipv6=true");
            const data = await response.json();
            ipv6Element.textContent = data.ip;
        } catch (error) {
            ipv6Element.textContent = "Error getting IPv6";
        }
        document.getElementById("rowIPv6").style.display = "table-row";
    }

    // Determine browser and version
    if (settings.showBrowser) {
        const userAgent = navigator.userAgent;
        const browser = getBrowserInfo(userAgent);
        browserElement.textContent = browser;
        document.getElementById("rowBrowser").style.display = "table-row";
    }

    // Determine OS
    if (settings.showOS) {
        const userAgent = navigator.userAgent;
        const os = getOSInfo(userAgent);
        osElement.textContent = os;
        document.getElementById("rowOS").style.display = "table-row";
    }

    // Get page load time
    if (settings.showLoadTime) {
        const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
        loadTimeElement.textContent = `${loadTime} ms`;
        document.getElementById("rowLoadTime").style.display = "table-row";
    }

    // Get screen resolution
    if (settings.showScreenResolution) {
        const screenResolution = `${window.screen.width} x ${window.screen.height}`;
        screenResolutionElement.textContent = screenResolution;
        document.getElementById("rowScreenResolution").style.display = "table-row";
    }

    // Get browser language
    if (settings.showLanguage) {
        const language = navigator.language || navigator.userLanguage;
        languageElement.textContent = language;
        document.getElementById("rowLanguage").style.display = "table-row";
    }

    // Get platform
    if (settings.showPlatform) {
        platformElement.textContent = navigator.platform;
        document.getElementById("rowPlatform").style.display = "table-row";
    }

    // Get cookies enabled status
    if (settings.showCookiesEnabled) {
        cookiesEnabledElement.textContent = navigator.cookieEnabled ? "Yes" : "No";
        document.getElementById("rowCookiesEnabled").style.display = "table-row";
    }

    // Get system time and timezone
    if (settings.showSystemTime) {
        const systemTime = new Date().toLocaleString();
        const systemTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        systemTimeElement.textContent = `${systemTime} (${systemTimezone})`;
        document.getElementById("rowSystemTime").style.display = "table-row";
    }

    // Get browser time and timezone
    if (settings.showBrowserTime) {
        const browserTime = new Date().toLocaleString();
        const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        browserTimeElement.textContent = `${browserTime} (${browserTimezone})`;
        document.getElementById("rowBrowserTime").style.display = "table-row";
    }

    // Show the info table
    document.querySelector(".info-table").style.display = "table";

    // Show the settings menu
    document.getElementById("settingsButton").addEventListener("click", () => {
        document.getElementById("settings").classList.toggle("active");
        if (!document.getElementById("settings").classList.contains("active")) {
            updateTable();
        }
    });

    // Save settings
    document.querySelectorAll(".settings-toggle").forEach(toggle => {
        toggle.addEventListener("change", saveSettings);
    });
}
