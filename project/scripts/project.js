/* =========================
   TRAVEL TIPS DATA
========================= */

const travelTips = [
    {
        title: "Create a packing list",
        category: "packing",
        description: "Write down the items you need before packing. Organize the list by clothing, documents, electronics, toiletries, and other essentials."
    },

    {
        title: "Pack versatile clothing",
        category: "packing",
        description: "Choose clothing that can work for multiple activities and weather conditions so you can keep your luggage manageable."
    },

    {
        title: "Set a realistic travel budget",
        category: "budget",
        description: "Estimate transportation, accommodation, food, activities, communication, and unexpected expenses before your trip."
    },

    {
        title: "Keep an emergency reserve",
        category: "budget",
        description: "Leave some room in your budget for unexpected transportation costs, changes to plans, or other emergencies."
    },

    {
        title: "Protect important documents",
        category: "safety",
        description: "Keep important documents secure and maintain accessible copies of essential travel information."
    },

    {
        title: "Research your destination",
        category: "safety",
        description: "Learn about local customs, transportation, important phone numbers, weather, and areas you plan to visit."
    },

    {
        title: "Confirm transportation",
        category: "transport",
        description: "Review your departure times, arrival details, tickets, baggage requirements, and transportation connections."
    },

    {
        title: "Plan your airport arrival",
        category: "transport",
        description: "Allow enough time for check-in, security, boarding, and unexpected delays."
    }
];


/* =========================
   FOOTER
========================= */

function updateFooter() {

    const currentYear = document.querySelector("#currentYear");
    const lastModified = document.querySelector("#lastModified");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    if (lastModified) {
        lastModified.textContent = document.lastModified;
    }
}


/* =========================
   MOBILE NAVIGATION
========================= */

function setupNavigation() {

    const menuButton = document.querySelector("#menuButton");
    const mainNav = document.querySelector("#mainNav");

    if (!menuButton || !mainNav) {
        return;
    }

    menuButton.addEventListener("click", () => {

        mainNav.classList.toggle("open");

        if (mainNav.classList.contains("open")) {
            menuButton.setAttribute("aria-label", "Close navigation menu");
            menuButton.textContent = "✕";
        } else {
            menuButton.setAttribute("aria-label", "Open navigation menu");
            menuButton.textContent = "☰";
        }
    });
}


/* =========================
   DISPLAY TRAVEL TIPS
========================= */

function displayTips(category = "all") {

    const tipsContainer = document.querySelector("#tipsContainer");

    if (!tipsContainer) {
        return;
    }

    let filteredTips = travelTips;

    if (category !== "all") {
        filteredTips = travelTips.filter(
            tip => tip.category === category
        );
    }

    if (filteredTips.length === 0) {

        tipsContainer.innerHTML = `
            <p class="no-results">
                No travel tips were found for this category.
            </p>
        `;

        return;
    }

    tipsContainer.innerHTML = filteredTips.map(tip => {

        const categoryName =
            tip.category.charAt(0).toUpperCase() +
            tip.category.slice(1);

        return `
            <article class="tip-card">
                <span class="tip-category">${categoryName}</span>
                <h3>${tip.title}</h3>
                <p>${tip.description}</p>
            </article>
        `;

    }).join("");
}


/* =========================
   TIP FILTER
========================= */

function setupTipFilters() {

    const filterButtons =
        document.querySelectorAll(".filter-button");

    if (filterButtons.length === 0) {
        return;
    }

    displayTips();

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(item => {
                item.classList.remove("active-filter");
            });

            button.classList.add("active-filter");

            const category =
                button.dataset.category;

            displayTips(category);
        });
    });
}


/* =========================
   CHECKLIST
========================= */

function getChecklistState() {

    const savedState =
        localStorage.getItem("travelChecklist");

    if (savedState) {
        return JSON.parse(savedState);
    }

    return {};
}


function saveChecklistState() {

    const checkboxes =
        document.querySelectorAll(".check-item input");

    const state = {};

    checkboxes.forEach(checkbox => {

        state[checkbox.dataset.task] =
            checkbox.checked;
    });

    localStorage.setItem(
        "travelChecklist",
        JSON.stringify(state)
    );
}


function updateChecklistProgress() {

    const checkboxes =
        document.querySelectorAll(".check-item input");

    const progressText =
        document.querySelector("#progressText");

    const progressBar =
        document.querySelector("#progressBar");

    if (
        checkboxes.length === 0 ||
        !progressText ||
        !progressBar
    ) {
        return;
    }

    let completed = 0;

    checkboxes.forEach(checkbox => {

        if (checkbox.checked) {
            completed += 1;
        }
    });

    const percentage =
        Math.round((completed / checkboxes.length) * 100);

    progressText.textContent = `${percentage}%`;
    progressBar.style.width = `${percentage}%`;
}


function loadChecklist() {

    const checkboxes =
        document.querySelectorAll(".check-item input");

    if (checkboxes.length === 0) {
        return;
    }

    const savedState =
        getChecklistState();

    checkboxes.forEach(checkbox => {

        const task =
            checkbox.dataset.task;

        if (savedState[task]) {
            checkbox.checked = true;
        }

        checkbox.addEventListener("change", () => {

            saveChecklistState();
            updateChecklistProgress();
        });
    });

    updateChecklistProgress();
}


function resetChecklist() {

    const resetButton =
        document.querySelector("#resetChecklist");

    if (!resetButton) {
        return;
    }

    resetButton.addEventListener("click", () => {

        const checkboxes =
            document.querySelectorAll(".check-item input");

        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });

        localStorage.removeItem("travelChecklist");

        updateChecklistProgress();
    });
}


/* =========================
   DESTINATION FORM
========================= */

function setupDestinationForm() {

    const form =
        document.querySelector("#destinationForm");

    const input =
        document.querySelector("#destination");

    const message =
        document.querySelector("#destinationMessage");

    if (!form || !input || !message) {
        return;
    }

    const savedDestination =
        localStorage.getItem("travelDestination");

    if (savedDestination) {

        input.value = savedDestination;

        message.textContent =
            `Your saved destination is ${savedDestination}.`;
    }


    form.addEventListener("submit", event => {

        event.preventDefault();

        const destination =
            input.value.trim();

        if (destination === "") {

            message.textContent =
                `Please enter a destination before saving.`;

            return;
        }

        localStorage.setItem(
            "travelDestination",
            destination
        );

        message.textContent =
            `Great choice! ${destination} has been saved as your next destination.`;
    });
}


/* =========================
   INITIALIZE WEBSITE
========================= */

function initializeWebsite() {

    updateFooter();

    setupNavigation();

    setupTipFilters();

    loadChecklist();

    resetChecklist();

    setupDestinationForm();
}


initializeWebsite();