export function getScreenResolution(elements) {
    const screenResolution = `${window.screen.width} x ${window.screen.height}`;
    elements.screenResolution.textContent = screenResolution;
}
