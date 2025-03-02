export function getBrowserTime(elements) {
    const browserTime = new Date().toLocaleString();
    const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    elements.browserTime.textContent = `${browserTime} (${browserTimezone})`;
}
