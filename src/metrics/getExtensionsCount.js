export function getExtensionsCount(elements) {
  chrome.management.getAll(extensions => {
      elements.extensionsCount.textContent = extensions.length;
  });
}
