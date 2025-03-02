export function getBrowserLastUpdate(elements) {
  // Use a placeholder date as navigator.buildID is not a valid date
  const lastUpdate = new Date().toLocaleString();
  elements.browserLastUpdate.textContent = lastUpdate;
}
