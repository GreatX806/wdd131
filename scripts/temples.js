/* Last Modified */
const modifiedElement = document.getElementById("lastModified");
if (modifiedElement) {
    modifiedElement.textContent = `Last Modified: ${document.lastModified}`;
}

/* Hamburger Menu Toggle */
const menuButton = document.getElementById("menu");
const navMenu = document.getElementById("nav"); // Ensure your nav has id="nav"

menuButton.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    menuButton.classList.toggle("active");

    // Toggle icon and aria-label for accessibility
    if (navMenu.classList.contains("open")) {
        menuButton.innerHTML = "&#x2715;"; // X icon
        menuButton.setAttribute("aria-expanded", "true");
    } else {
        menuButton.innerHTML = "&#9776;"; // Hamburger icon
        menuButton.setAttribute("aria-expanded", "false");
    }
});