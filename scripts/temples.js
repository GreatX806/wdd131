/* Last Modified */
const modifiedElement = document.getElementById("lastModified");
if (modifiedElement) {
    modifiedElement.textContent = `Last Modified: ${document.lastModified}`;
}

/* Hamburger Menu */
const menuButton = document.getElementById("menu");
const nav = document.getElementById("nav");

menuButton.addEventListener("click", () => {
    nav.classList.toggle("open");

    // toggle icon
    if (nav.classList.contains("open")) {
        menuButton.innerHTML = "&#x2715;";
    } else {
        menuButton.innerHTML = "☰";
    }
});
