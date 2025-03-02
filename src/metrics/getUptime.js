export function getUptime(elements) {
  chrome.runtime.sendMessage({ action: "getUptime" }, response => {
      const uptime = response.uptime;
      const hours = Math.floor(uptime / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = uptime % 60;
      elements.uptime.textContent = `${hours}h ${minutes}m ${seconds}s`;
  });
}