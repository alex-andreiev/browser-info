export function getLoadTime(elements) {
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    elements.loadTime.textContent = `${loadTime} ms`;
}
