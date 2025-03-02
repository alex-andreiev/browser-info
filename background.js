let startTime = Date.now();

chrome.runtime.onInstalled.addListener(() => {
    console.log("Browser Info Extension installed!");
});

chrome.runtime.onStartup.addListener(() => {
    startTime = Date.now();
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getUptime") {
        const uptime = Math.round((Date.now() - startTime) / 1000); // uptime in seconds
        sendResponse({ uptime });
    }
});
