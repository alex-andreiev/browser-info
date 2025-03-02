export function getSystemTime(elements) {
    const systemTime = new Date().toLocaleString();
    const systemTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    elements.systemTime.textContent = `${systemTime} (${systemTimezone})`;
}
