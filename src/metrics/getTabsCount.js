export function getTabsCount(elements) {
  chrome.tabs.query({}, function(tabs) {
      elements.tabsCount.textContent = tabs.length;
  });
}