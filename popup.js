import { loadSettings } from './src/settings.js';
import {
    hideAllRows,
    setCheckboxes,
    showMetrics,
    showInfoTable,
    showSettingsMenu,
    saveSettingsBtn,
    resetSettingsBtn,
    generateTable,
} from './src/dom.js';

document.addEventListener("DOMContentLoaded", init);

async function init() {
    const settings = await loadSettings();

    hideAllRows();
    setCheckboxes(settings);
    showMetrics(settings);
    showInfoTable();
    showSettingsMenu();
    saveSettingsBtn();
    resetSettingsBtn();
}

generateTable();
