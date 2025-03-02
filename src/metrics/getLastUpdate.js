export function getLastUpdate(elements) {
  const lastUpdate = new Date(document.lastModified).toLocaleString();
  elements.lastUpdate.textContent = lastUpdate;
}
