export function getCookiesEnabled(elements) {
    elements.cookiesEnabled.textContent = navigator.cookieEnabled ? "Yes" : "No";
}
