import { loadSettings, saveSettings, updateTable } from './settings.js';
import { getBrowserInfo, getOSInfo, generateKey } from './utils.js';
import { METRICS, ACRONYMS } from './constants.js';

document.addEventListener("DOMContentLoaded", init);

async function init() {
    const elements = getElements();
    const settings = await loadSettings();

    // Hide all rows initially
    document.querySelectorAll(".info-table tr").forEach(row => {
        row.style.display = "none";
    });

    // Set checkboxes based on settings
    setCheckboxes(settings);

    // Get external IP via ipify API
    if (settings.showIP) {
        try {
            const response = await fetch("https://api64.ipify.org?format=json");
            const data = await response.json();
            elements.ip.textContent = data.ip;
        } catch (error) {
            elements.ip.textContent = "Error getting IP";
        }
        document.getElementById("rowIP").style.display = "table-row";
    }

    // Get external IPv6 via ipify API
    if (settings.showIPv6) {
        try {
            const response = await fetch("https://api64.ipify.org?format=json&ipv6=true");
            const data = await response.json();
            elements.ipv6.textContent = data.ip;
        } catch (error) {
            elements.ipv6.textContent = "Error getting IPv6";
        }
        document.getElementById("rowIPv6").style.display = "table-row";
    }

    // Determine browser and version
    if (settings.showBrowser) {
        const userAgent = navigator.userAgent;
        const browser = getBrowserInfo(userAgent);
        elements.browser.textContent = browser;
        document.getElementById("rowBrowser").style.display = "table-row";
    }

    // Determine OS
    if (settings.showOS) {
        const userAgent = navigator.userAgent;
        const os = getOSInfo(userAgent);
        elements.os.textContent = os;
        document.getElementById("rowOS").style.display = "table-row";
    }

    // Get page load time
    if (settings.showLoadTime) {
        const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
        elements.loadTime.textContent = `${loadTime} ms`;
        document.getElementById("rowLoadTime").style.display = "table-row";
    }

    // Get screen resolution
    if (settings.showScreenResolution) {
        const screenResolution = `${window.screen.width} x ${window.screen.height}`;
        elements.screenResolution.textContent = screenResolution;
        document.getElementById("rowScreenResolution").style.display = "table-row";
    }

    // Get browser language
    if (settings.showLanguage) {
        const language = navigator.language || navigator.userLanguage;
        elements.language.textContent = language;
        document.getElementById("rowLanguage").style.display = "table-row";
    }

    // Get platform
    if (settings.showPlatform) {
        elements.platform.textContent = navigator.platform;
        document.getElementById("rowPlatform").style.display = "table-row";
    }

    // Get cookies enabled status
    if (settings.showCookiesEnabled) {
        elements.cookiesEnabled.textContent = navigator.cookieEnabled ? "Yes" : "No";
        document.getElementById("rowCookiesEnabled").style.display = "table-row";
    }

    // Get system time and timezone
    if (settings.showSystemTime) {
        const systemTime = new Date().toLocaleString();
        const systemTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        elements.systemTime.textContent = `${systemTime} (${systemTimezone})`;
        document.getElementById("rowSystemTime").style.display = "table-row";
    }

    // Get browser time and timezone
    if (settings.showBrowserTime) {
        const browserTime = new Date().toLocaleString();
        const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        elements.browserTime.textContent = `${browserTime} (${browserTimezone})`;
        document.getElementById("rowBrowserTime").style.display = "table-row";
    }

    // Get user agent
    if (settings.showUserAgent) {
        elements.userAgent.textContent = navigator.userAgent;
        document.getElementById("rowUserAgent").style.display = "table-row";
    }

    // Get referrer
    if (settings.showReferrer) {
        elements.referrer.textContent = document.referrer || "No referrer";
        document.getElementById("rowReferrer").style.display = "table-row";
    }

    // Get JavaScript enabled status
    if (settings.showJsEnabled) {
        elements.jsEnabled.textContent = "Yes";
        document.getElementById("rowJsEnabled").style.display = "table-row";
    }

    // Get browser uptime
    if (settings.showUptime) {
        const uptime = Math.round(performance.now() / 1000); // uptime in seconds
        elements.uptime.textContent = `${uptime} seconds`;
        document.getElementById("rowUptime").style.display = "table-row";
    }

    // Get number of open tabs
    if (settings.showTabsCount) {
        chrome.tabs.query({}, function(tabs) {
            elements.tabsCount.textContent = tabs.length;
            document.getElementById("rowTabsCount").style.display = "table-row";
        });
    }

    // Get last update time
    if (settings.showLastUpdate) {
        const lastUpdate = new Date(document.lastModified).toLocaleString();
        elements.lastUpdate.textContent = lastUpdate;
        document.getElementById("rowLastUpdate").style.display = "table-row";
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

    // Reset settings
    document.getElementById("resetButton").addEventListener("click", resetSettings);
}

function getElements() {
    const elements = {};
    METRICS.forEach(({ key }) => {
        elements[key] = document.getElementById(key);
    });
    return elements;
}

function setCheckboxes(settings) {
  METRICS.forEach(({key}) => {
      const elementId = generateKey(key, 'toggle');
      const settingId = generateKey(key, 'show');
      const checkbox = document.getElementById(elementId);
      if (checkbox) {
          checkbox.checked = settings[settingId];
      }
  });
}

function resetSettings() {
    chrome.storage.sync.clear(() => {
        location.reload();
    });
}
