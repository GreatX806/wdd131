// --- 1. Footer Update ---
document.querySelector("#year-now").textContent = new Date().getFullYear();
document.querySelector("#page-update").textContent = `Last Updated: ${document.lastModified}`;

// --- 2. Updated Temple Data Array (Matching Assignment Properties) ---
// NOTE: I've added 'dedicated' for date filtering and 'area' for size filtering.
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7", // New: For date filtering
        area: 11500, // New: For size filtering
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    // --- ADDED 3+ TEMPLE OBJECTS (To reach 10 total) ---
    {
        templeName: "Salt Lake Utah",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 253015,
        imageUrl: "https://assets.churchofjesuschrist.org/7e5fbcd0a3789980821bb6a15785e96ea488e674.jpeg"
    },
    {
        templeName: "Kyiv Ukraine",
        location: "Kyiv, Ukraine",
        dedicated: "2010, August, 29",
        area: 20975,
        imageUrl: "https://newsroom.churchofjesuschrist.org/media/1024x373/salt-lake-manti-temples-2.jpg"
    },
    {
        templeName: "Sapporo Japan",
        location: "Sapporo, Japan",
        dedicated: "2016, August, 21",
        area: 48480,
        imageUrl: "https://www.churchofjesuschrist.org/bc/content/ldsorg/content/images/landing-page-history-of-temples-nauvoo-20110307.jpg"
    }
];

// --- 3. DOM Element Hooks ---
// Assuming your HTML has a container like <div class="card-container"> inside main
const templeContainer = document.querySelector('.card-container'); 
const navLinks = document.querySelectorAll("nav a"); // Select all <a> tags in nav for events

// --- 4. Function to Create a Single Temple Card ---
// Renamed and updated to match the assignment's data properties (name, dedicated, area, etc.)
function createTempleCard(temple) {
    // 1. Create main elements
    let card = document.createElement("figure");
    let name = document.createElement("h2");
    let location = document.createElement("p");
    let dedicated = document.createElement("p");
    let area = document.createElement("p");
    let img = document.createElement("img");

    // 2. Populate text content
    name.textContent = temple.templeName;
    location.innerHTML = `<span class="label">Location:</span> ${temple.location}`;
    dedicated.innerHTML = `<span class="label">Dedicated:</span> ${temple.dedicated}`;
    area.innerHTML = `<span class="label">Area:</span> ${temple.area.toLocaleString()} sq ft`; 

    // 3. Set image attributes (CRITICAL STEP)
    img.setAttribute("src", temple.imageUrl);
    img.setAttribute("alt", `${temple.templeName} Temple`);
    img.setAttribute("loading", "lazy"); // REQUIRED: Native Lazy Loading

    // 4. Append all children to the card
    card.appendChild(name);
    card.appendChild(location);
    card.appendChild(dedicated);
    card.appendChild(area);
    card.appendChild(img);

    // 5. Append the card to the main HTML element
    templeContainer.appendChild(card); 
}

// --- 5. Function to Clear and Display Temples ---
function displayTemples(filteredTemples) {
    // REQUIRED: Clear any existing content before loading the new list
    templeContainer.innerHTML = ""; 

    filteredTemples.forEach(temple => {
        createTempleCard(temple);
    });
}

// --- 6. Initial Load ---
// Display all temples when the script first runs
displayTemples(temples); 

// --- 7. Filtering Logic and Event Listener ---
navLinks.forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent page reload/jump
        
        const filterId = event.target.id; // Get the ID: "home", "old", "new", "large", "small"
        let filteredData = [];

        // Remove active class from all links and add it to the clicked link
        navLinks.forEach(a => a.classList.remove('active'));
        event.target.classList.add('active');
        
        // Helper to get the dedication year from the string (e.g., "2005, August, 7" -> 2005)
        const getYear = (dateString) => new Date(dateString).getFullYear();

        switch (filterId) {
            case "old":
                // Old – temples built before 1900
                filteredData = temples.filter(t => getYear(t.dedicated) < 1900);
                break;
            case "new":
                // New – temples built after 2000
                filteredData = temples.filter(t => getYear(t.dedicated) > 2000);
                break;
            case "large":
                // Large – temples larger than 90,000 square feet
                filteredData = temples.filter(t => t.area > 90000);
                break;
            case "small":
                // Small – temples smaller than 10,000 square feet
                filteredData = temples.filter(t => t.area < 10000);
                break;
            case "home":
            default:
                // Home – displays all temples
                filteredData = temples;
                break;
        }

        displayTemples(filteredData);
    });
});