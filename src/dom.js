import { METRICS } from './constants.js';
import { generateKey, generateLabel } from './utils.js';
import { saveSettings, updateTable, resetSettings } from './settings.js';
import * as metrics from './metrics/index.js';


export function getElements() {
    const elements = {};
    METRICS.forEach(({ key }) => {
        elements[key] = document.getElementById(key);
    });
    return elements;
}

export function setCheckboxes(settings) {
    METRICS.forEach(({ key }) => {
        const elementId = generateKey(key, 'toggle');
        const settingId = generateKey(key, 'show');
        const checkbox = document.getElementById(elementId);
        if (checkbox) {
            checkbox.checked = settings[settingId];
        }
    });
}

export function generateTable() {
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

export function hideAllRows() {
    document.querySelectorAll(".info-table tr").forEach(row => {
        row.style.display = "none";
    });
}

export function showMetrics(settings) {
    const elements = getElements();

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
}

export function showInfoTable() {
  document.querySelector(".info-table").style.display = "table";
}

export function showSettingsMenu() {
    document.getElementById("settingsButton").addEventListener("click", () => {
        document.getElementById("settings").classList.toggle("active");
        if (!document.getElementById("settings").classList.contains("active")) {
            updateTable();
        }
    });
}

export function saveSettingsBtn() {
    document.querySelectorAll(".settings-toggle").forEach(toggle => {
        toggle.addEventListener("change", async () => {
            saveSettings();
            const key = toggle.id.replace('toggle', '');
            const metricFunction = generateKey(key, 'get');
            const rowElement = document.getElementById(generateKey(key, 'row'));

            console.log({
              key: key,
              metricFunction: metricFunction,
              rowElement: rowElement,
              toggle_checked: toggle.checked,
              function: typeof metrics[metricFunction] === 'function'
            })

            if (toggle.checked && typeof metrics[metricFunction] === 'function') {
                await metrics[metricFunction](getElements());
                if (rowElement) {
                    rowElement.style.display = "table-row";
                }
            } else {
                if (rowElement) {
                    rowElement.style.display = "none";
                }
            }
        });
    });
}

export function resetSettingsBtn() {
  document.getElementById("resetButton").addEventListener("click", resetSettings);
}
