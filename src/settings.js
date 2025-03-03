import { METRICS } from './constants.js';
import { generateKey } from './utils.js';

export async function loadSettings() {
    const defaultSettings = METRICS.reduce((acc, { key, default: defaultValue }) => {
        acc[generateKey(key, 'show')] = defaultValue;
        return acc;
    }, {});

    return new Promise(resolve => {
        chrome.storage.sync.get(defaultSettings, resolve);
    });
}

export function saveSettings() {
    const settings = METRICS.reduce((acc, { key }) => {
        const elementId = generateKey(key, 'toggle');
        const settingId = generateKey(key, 'show');
        acc[settingId] = document.getElementById(elementId).checked;
        return acc;
    }, {});

    chrome.storage.sync.set(settings, updateTable);
}

export async function updateTable() {
    const settings = await loadSettings();

    // Hide all rows initially
    document.querySelectorAll(".info-table tr").forEach(row => {
        row.style.display = "none";
    });

    // Show rows based on settings
    METRICS.forEach(({ key }) => {
        const rowId = generateKey(key, 'row');
        const settingId = generateKey(key, 'show');
        if (settings[settingId]) {
            document.getElementById(rowId).style.display = "table-row";
        }
    });
}

export function resetSettings() {
    chrome.storage.sync.clear(() => {
        location.reload();
    });
}
