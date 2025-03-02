export const METRICS = [
  { key: "ip", default: true },
  { key: "ipv6", default: false },
  { key: "browser", default: true },
  { key: "os", default: true },
  { key: "loadTime", default: false },
  { key: "screenResolution", default: false },
  { key: "language", default: false },
  { key: "platform", default: false },
  { key: "cookiesEnabled", default: false },
  { key: "systemTime", default: false },
  { key: "browserTime", default: false },
  { key: "userAgent", default: false },
  { key: "referrer", default: false },
  { key: "jsEnabled", default: false },
  { key: "uptime", default: false },
  { key: "tabsCount", default: false },
  { key: "lastUpdate", default: false },
  { key: "systemUptime", default: false },
  { key: "extensionsCount", default: false },
  { key: "memoryUsage", default: false },
  { key: "browserVersion", default: false },
  { key: "browserLastUpdate", default: false },
  { key: "localIp", default: false }
];

export const ACRONYMS = [
  "ip", "os"
];

export const ACRONYM_REGEXES = ACRONYMS.map(acronym => new RegExp(`\\b${acronym}\\b`, 'gi'));
export const CAPITALIZE_FIRST_REGEX = /^./;
export const INSERT_SPACES_REGEX = /([A-Z])/g;

export const BROWSER_REGEXES = {
  chrome: /Chrome\/(\d+\.\d+)/,
  firefox: /Firefox\/(\d+\.\d+)/,
  edge: /Edg\/(\d+\.\d+)/
};

export const LOCAL_IP_REGEX = /([0-9]{1,3}(\.[0-9]{1,3}){3})/;

