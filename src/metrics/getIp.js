// New file: getIP.js
export async function getIp(elements) {
    try {
        const response = await fetch("https://api64.ipify.org?format=json");
        const data = await response.json();
        elements.ip.textContent = data.ip;
    } catch (error) {
        elements.ip.textContent = "Error getting IP";
    }
}
