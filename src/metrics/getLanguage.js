export function getLanguage(elements) {
    const language = navigator.language || navigator.userLanguage;
    elements.language.textContent = language;
}
