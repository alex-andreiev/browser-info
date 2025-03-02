export function getSystemUptime(elements) {
  const uptime = Math.round(performance.now() / 1000); // uptime in seconds
  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = uptime % 60;
  elements.systemUptime.textContent = `${hours}h ${minutes}m ${seconds}s`;
}