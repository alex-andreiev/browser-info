import { loadSettings, saveSettings, updateTable } from './settings.js';
import { generateKey } from './utils.js';
import { METRICS } from './constants.js';
import * as metrics from './metrics.js';

document.addEventListener("DOMContentLoaded", init);

async function init() {
    const elements = getElements();
    const settings = await loadSettings();

    // Hide all rows initially
    document.querySelectorAll(".info-table tr").forEach(row => {
        row.style.display = "none";
    });

    // Set checkboxes based on settings
    setCheckboxes(settings);

    // Get data for each metric
    METRICS.forEach(({ key }) => {
        const settingId = generateKey(key, 'show');
        if (settings[settingId]) {
            metrics[generateKey(key, 'get')](elements);
            document.getElementById(generateKey(key, 'row')).style.display = "table-row";
        }
    });

    // Show the info table
    document.querySelector(".info-table").style.display = "table";

    // Show the settings menu
    document.getElementById("settingsButton").addEventListener("click", () => {
        document.getElementById("settings").classList.toggle("active");
        if (!document.getElementById("settings").classList.contains("active")) {
            updateTable();
        }
    });

    // Save settings
    document.querySelectorAll(".settings-toggle").forEach(toggle => {
        toggle.addEventListener("change", saveSettings);
    });

    // Reset settings
    document.getElementById("resetButton").addEventListener("click", resetSettings);
}

function getElements() {
    const elements = {};
    METRICS.forEach(({ key }) => {
        elements[key] = document.getElementById(key);
    });
    return elements;
}

function setCheckboxes(settings) {
  METRICS.forEach(({key}) => {
      const elementId = generateKey(key, 'toggle');
      const settingId = generateKey(key, 'show');
      const checkbox = document.getElementById(elementId);
      if (checkbox) {
          checkbox.checked = settings[settingId];
      }
  });
}

function resetSettings() {
    chrome.storage.sync.clear(() => {
        location.reload();
    });
}
