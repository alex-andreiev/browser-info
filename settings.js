export async function loadSettings() {
    return new Promise(resolve => {
        chrome.storage.sync.get({
            showIP: true,
            showIPv6: false,
            showBrowser: true,
            showOS: false,
            showLoadTime: false,
            showScreenResolution: false,
            showLanguage: false,
            showPlatform: true,
            showCookiesEnabled: false,
            showSystemTime: false,
            showBrowserTime: false,
            showUserAgent: false,
            showReferrer: false,
            showJsEnabled: false,
            showUptime: false,
            showTabsCount: false,
            showLastUpdate: false
        }, resolve);
    });
}

export function saveSettings() {
    const settings = {
        showIP: document.getElementById("toggleIP").checked,
        showIPv6: document.getElementById("toggleIPv6").checked,
        showBrowser: document.getElementById("toggleBrowser").checked,
        showOS: document.getElementById("toggleOS").checked,
        showLoadTime: document.getElementById("toggleLoadTime").checked,
        showScreenResolution: document.getElementById("toggleScreenResolution").checked,
        showLanguage: document.getElementById("toggleLanguage").checked,
        showPlatform: document.getElementById("togglePlatform").checked,
        showCookiesEnabled: document.getElementById("toggleCookiesEnabled").checked,
        showSystemTime: document.getElementById("toggleSystemTime").checked,
        showBrowserTime: document.getElementById("toggleBrowserTime").checked,
        showUserAgent: document.getElementById("toggleUserAgent").checked,
        showReferrer: document.getElementById("toggleReferrer").checked,
        showJsEnabled: document.getElementById("toggleJsEnabled").checked,
        showUptime: document.getElementById("toggleUptime").checked,
        showTabsCount: document.getElementById("toggleTabsCount").checked,
        showLastUpdate: document.getElementById("toggleLastUpdate").checked
    };
    chrome.storage.sync.set(settings);
    updateTable();
}

export async function updateTable() {
    const settings = await loadSettings();

    // Hide all rows initially
    document.querySelectorAll(".info-table tr").forEach(row => {
        row.style.display = "none";
    });

    // Show rows based on settings
    if (settings.showIP) document.getElementById("rowIP").style.display = "table-row";
    if (settings.showIPv6) document.getElementById("rowIPv6").style.display = "table-row";
    if (settings.showBrowser) document.getElementById("rowBrowser").style.display = "table-row";
    if (settings.showOS) document.getElementById("rowOS").style.display = "table-row";
    if (settings.showLoadTime) document.getElementById("rowLoadTime").style.display = "table-row";
    if (settings.showScreenResolution) document.getElementById("rowScreenResolution").style.display = "table-row";
    if (settings.showLanguage) document.getElementById("rowLanguage").style.display = "table-row";
    if (settings.showPlatform) document.getElementById("rowPlatform").style.display = "table-row";
    if (settings.showCookiesEnabled) document.getElementById("rowCookiesEnabled").style.display = "table-row";
    if (settings.showSystemTime) document.getElementById("rowSystemTime").style.display = "table-row";
    if (settings.showBrowserTime) document.getElementById("rowBrowserTime").style.display = "table-row";
    if (settings.showUserAgent) document.getElementById("rowUserAgent").style.display = "table-row";
    if (settings.showReferrer) document.getElementById("rowReferrer").style.display = "table-row";
    if (settings.showJsEnabled) document.getElementById("rowJsEnabled").style.display = "table-row";
    if (settings.showUptime) document.getElementById("rowUptime").style.display = "table-row";
    if (settings.showTabsCount) document.getElementById("rowTabsCount").style.display = "table-row";
    if (settings.showLastUpdate) document.getElementById("rowLastUpdate").style.display = "table-row";
}
