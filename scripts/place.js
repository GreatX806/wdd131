// Static weather data for calculation (using Imperial units from the HTML)
// Temp: 88°F (31°C) - Note: 88°F > 50°F
// Wind: 4 mph
const tempF = 88; // Static temperature in °F
const speedMph = 4; // Static wind speed in mph

/**
 * Calculates the wind chill factor based on Imperial units.
 * Formula: 35.74 + 0.6215T - 35.75V^0.16 + 0.4275TV^0.16
 * @param {number} temperature - Air temperature in Fahrenheit (°F)
 * @param {number} windSpeed - Wind speed in miles per hour (mph)
 * @returns {string} The wind chill factor (to 1 decimal place) or "N/A"
 */
function calculateWindChill(temperature, windSpeed) {
    // Check if conditions for viable wind chill calculation are met (Imperial):
    // Temperature <= 50°F AND Wind speed > 3 mph
    if (temperature <= 50 && windSpeed > 3) {
        // Required: Function uses one line of code to return the result
        const windChill = 35.74 + 0.6215 * temperature - 35.75 * Math.pow(windSpeed, 0.16) + 0.4275 * temperature * Math.pow(windSpeed, 0.16);
        return windChill.toFixed(1) + "°F";
    } else {
        // If conditions are not met, display "N/A"
        return "N/A";
    }
}

// 1. Footer Content
document.addEventListener('DOMContentLoaded', () => {
    // A. Display Current Year
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }

    // B. Display Last Modified Date
    const lastModified = document.lastModified;
    const modifiedElement = document.getElementById('lastModified');
    if (modifiedElement) {
        modifiedElement.textContent = `Last Updated: ${lastModified}`;
    }

    // 2. Windchill Calculation
    const windChillResult = calculateWindChill(tempF, speedMph);

    // Get the element to display the result
    const windChillElement = document.querySelector('.wind-chill-val');
    
    // C. Update the Wind Chill Display
    if (windChillElement) {
        // Since the static temp is 88°F and must be <= 50°F for a calculation,
        // this will display "N/A", which is correct for the logic.
        windChillElement.textContent = windChillResult;
    }
});