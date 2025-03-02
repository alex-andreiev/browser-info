// New file: getIPv6.js
export async function getIpv6(elements) {
    try {
        const response = await fetch("https://api64.ipify.org?format=json&ipv6=true");
        const data = await response.json();
        elements.ipv6.textContent = data.ip;
    } catch (error) {
        elements.ipv6.textContent = "Error getting IPv6";
    }
}
