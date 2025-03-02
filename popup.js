import { loadSettings, saveSettings, updateTable } from './src/settings.js';
import { generateKey, generateLabel } from './src/utils.js';
import { METRICS } from './src/constants.js';
import * as metrics from './src/metrics/index.js';

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
            const metricFunction = `get${generateKey(key, '')}`;
            if (typeof metrics[metricFunction] === 'function') {
                metrics[metricFunction](elements);
                document.getElementById(generateKey(key, 'row')).style.display = "table-row";
            }
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
        toggle.addEventListener("change", async () => {
            saveSettings();
            const key = toggle.id.replace('toggle', '').toLowerCase();
            const metricFunction = generateKey(key, get);
            if (toggle.checked && typeof metrics[metricFunction] === 'function') {
                await metrics[metricFunction](elements);
                document.getElementById(generateKey(key, 'row')).style.display = "table-row";
            } else {
                document.getElementById(generateKey(key, 'row')).style.display = "none";
            }
        });
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

function generateTable() {
    const infoTable = document.querySelector(".info-table");
    const settingsTable = document.querySelector(".settings-table");

    METRICS.forEach(({ key }) => {
        const rowId = generateKey(key, 'row');
        const elementId = key;
        const checkboxId = generateKey(key, 'toggle');
        const label = generateLabel(key);

        // Info table row
        const infoRow = document.createElement("tr");
        infoRow.id = rowId;
        infoRow.innerHTML = `
            <td class="label">${label}:</td>
            <td id="${elementId}" class="value">Loading...</td>
        `;
        infoTable.appendChild(infoRow);

        // Settings table row
        const settingsRow = document.createElement("tr");
        settingsRow.innerHTML = `
            <td class="label">${label}:</td>
            <td><input type="checkbox" id="${checkboxId}" class="settings-toggle"></td>
        `;
        settingsTable.appendChild(settingsRow);
    });
}

generateTable();
