export function getReferrer(elements) {
  elements.referrer.textContent = document.referrer || "No referrer";
}
