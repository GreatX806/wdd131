// Footer Dates
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modification: ${document.lastModified}`;

// Wind Chill Calculation
const temp = parseFloat(document.getElementById("temp").textContent);
const windSpeed = parseFloat(document.getElementById("wind").textContent);

function calculateWindChill(t, v) {
    // Metric Formula: 13.12 + 0.6215T – 11.37V^0.16 + 0.3965TV^0.16
    return (13.12 + 0.6215 * t - 11.37 * Math.pow(v, 0.16) + 0.3965 * t * Math.pow(v, 0.16)).toFixed(1);
}

const windChillElement = document.getElementById("windchill");

// Specification: Temp <= 10°C AND Wind > 4.8 km/h
if (temp <= 10 && windSpeed > 4.8) {
    windChillElement.textContent = `${calculateWindChill(temp, windSpeed)} °C`;
} else {
    windChillElement.textContent = "N/A";
}