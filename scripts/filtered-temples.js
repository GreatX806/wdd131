/* ============================================
   Temple Album — filtered-temples.js
   Temple data, card rendering, and nav filtering
   ============================================ */

// Each temple: name, location, dedication date (ISO format for easy parsing),
// total floor area in square feet, and an absolute image URL with alt text.
// Source: churchofjesuschristtemples.org (an independent, non-official temple
// reference site) and Wikipedia. Dates/areas reflect the most recent published
// figures as of mid-2026 (some temples have been renovated/expanded over time).
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005-08-07",
    area: 11500,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/aba-nigeria-temple/aba-nigeria-temple-5087-main.jpg"
  },
  {
    templeName: "Bangkok Thailand",
    location: "Bangkok, Thailand",
    dedicated: "2023-10-22",
    area: 48525,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/bangkok-thailand-temple/bangkok-thailand-temple-40037-main.jpg"
  },
  {
    templeName: "St. George Utah",
    location: "St. George, Utah, USA",
    dedicated: "1877-04-06",
    area: 143969,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/st.-george-utah-temple/st.-george-utah-temple-40435-main.jpg"
  },
  {
    templeName: "Los Angeles California",
    location: "Los Angeles, California, USA",
    dedicated: "1956-03-11",
    area: 190614,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/los-angeles-california-temple/los-angeles-california-temple-38945-main.jpg"
  },
  {
    templeName: "Logan Utah",
    location: "Logan, Utah, USA",
    dedicated: "1884-05-17",
    area: 119619,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/logan-utah-temple/logan-utah-temple-40550-main.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, USA",
    dedicated: "1888-05-21",
    area: 74792,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/manti-utah-temple/manti-utah-temple-40551-main.jpg"
  },
  {
    templeName: "Seattle Washington",
    location: "Bellevue, Washington, USA",
    dedicated: "1980-11-17",
    area: 110000,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/seattle-washington-temple/seattle-washington-temple-55800-thumb.jpg"
  },
  {
    templeName: "Colonia Juárez Chihuahua Mexico",
    location: "Colonia Juárez, Chihuahua, Mexico",
    dedicated: "1999-03-06",
    area: 6800,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/colonia-juarez-chihuahua-mexico-temple/colonia-juarez-chihuahua-mexico-temple-1601-main.jpg"
  },
  {
    templeName: "Anchorage Alaska",
    location: "Anchorage, Alaska, USA",
    dedicated: "1999-01-09",
    area: 11937,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/anchorage-alaska-temple/anchorage-alaska-temple-57454-icon.jpg"
  },
  {
    templeName: "Red Cliffs Utah",
    location: "St. George, Utah, USA",
    dedicated: "2024-03-24",
    area: 96277,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/red-cliffs-utah-temple/red-cliffs-utah-temple-44958-main.jpg"
  },
  {
    templeName: "Alabang Philippines",
    location: "Muntinlupa City, Philippines",
    dedicated: "2026-01-18",
    area: 35998,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/alabang-philippines-temple/alabang-philippines-temple-65306-main.jpg"
  },
  {
    templeName: "Durban South Africa",
    location: "Umhlanga, South Africa",
    dedicated: "2020-02-16",
    area: 19860,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/durban-south-africa-temple/durban-south-africa-temple-7936-main.jpg"
  }
];

// ---------- Helpers ----------

// Format an ISO date string ("2005-08-07") into "August 7, 2005"
function formatDedicated(isoDate) {
  const date = new Date(`${isoDate}T00:00:00`);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

// Format a square-footage number with thousands separators: 190614 -> "190,614"
function formatArea(area) {
  return area.toLocaleString("en-US");
}

// ---------- Card rendering ----------

const galleryContainer = document.querySelector(".gallery");
const galleryTitle = document.querySelector(".gallery-title");
const navButtons = document.querySelectorAll(".navigation button");

function renderTemples(templeArray) {
  // Clear any existing cards before rendering the new filtered set
  galleryContainer.innerHTML = "";

  templeArray.forEach((temple) => {
    const figure = document.createElement("figure");
    figure.className = "temple-card";

    const img = document.createElement("img");
    img.src = temple.imageUrl;
    img.alt = `${temple.templeName} Temple`;
    img.loading = "lazy"; // native lazy loading
    img.width = 400;
    img.height = 300;

    const figcaption = document.createElement("figcaption");
    figcaption.innerHTML = `
      <h3>${temple.templeName}</h3>
      <p><span class="label">Location:</span> ${temple.location}</p>
      <p><span class="label">Dedicated:</span> ${formatDedicated(temple.dedicated)}</p>
      <p><span class="label">Area:</span> ${formatArea(temple.area)} sq ft</p>
    `;

    figure.append(img, figcaption);
    galleryContainer.append(figure);
  });
}

// ---------- Filtering ----------

function getFilteredTemples(filter) {
  switch (filter) {
    case "old":
      return temples.filter((t) => new Date(t.dedicated).getFullYear() < 1900);
    case "new":
      return temples.filter((t) => new Date(t.dedicated).getFullYear() > 2000);
    case "large":
      return temples.filter((t) => t.area > 90000);
    case "small":
      return temples.filter((t) => t.area < 10000);
    case "home":
    default:
      return temples;
  }
}

const filterTitles = {
  home: "All Temples",
  old: "Temples Built Before 1900",
  new: "Temples Built After 2000",
  large: "Temples Larger Than 90,000 Square Feet",
  small: "Temples Smaller Than 10,000 Square Feet"
};

function applyFilter(filter) {
  renderTemples(getFilteredTemples(filter));
  if (galleryTitle) galleryTitle.textContent = filterTitles[filter] ?? filterTitles.home;

  // Update active button styling + aria-pressed for accessibility
  navButtons.forEach((button) => {
    const isActive = button.dataset.filter === filter;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", isActive);
  });
}

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyFilter(button.dataset.filter);

    // Close the mobile menu after a selection is made
    const nav = document.querySelector(".navigation");
    nav.classList.remove("open");
  });
});

// ---------- Mobile menu toggle ----------

const menuButton = document.querySelector("#menu");
if (menuButton) {
  menuButton.addEventListener("click", () => {
    const nav = document.querySelector(".navigation");
    const isOpen = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen);
  });
}

// ---------- Footer: copyright year + last modified ----------

document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent =
  `Last Modified: ${document.lastModified}`;

// ---------- Initial render ----------

applyFilter("home");