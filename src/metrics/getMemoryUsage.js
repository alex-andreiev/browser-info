export function getMemoryUsage(elements) {
    if (chrome.system && chrome.system.memory) {
        chrome.system.memory.getInfo(memoryInfo => {
            const usedMemory = memoryInfo.capacity - memoryInfo.availableCapacity;
            elements.memoryUsage.textContent = `${(usedMemory / (1024 * 1024)).toFixed(2)} MB`;
        });
    } else {
        elements.memoryUsage.textContent = "Memory API not available";
    }
}