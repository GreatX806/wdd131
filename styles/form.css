const products = [
    {
        id: "fc-1888",
        name: "flux capacitor",
        averagerating: 4.5
    },
    {
        id: "fc-2050",
        name: "power laces",
        averagerating: 4.7
    },
    {
        id: "fs-1987",
        name: "time circuits",
        averagerating: 3.5
    },
    {
        id: "ac-2000",
        name: "low voltage reactor",
        averagerating: 3.9
    },
    {
        id: "jj-1969",
        name: "warp equalizer",
        averagerating: 5.0
    }
];


// Populate the product select field
const productSelect = document.querySelector("#productName");

if (productSelect) {
    products.forEach(product => {
        const option = document.createElement("option");

        option.value = product.id;
        option.textContent = product.name;

        productSelect.appendChild(option);
    });
}


// Footer current year
const currentYear = document.querySelector("#currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


// Footer last modified date
const lastModified = document.querySelector("#lastModified");

if (lastModified) {
    lastModified.textContent = document.lastModified;
}


// Review counter
const reviewCounter = document.querySelector("#reviewCounter");

if (reviewCounter) {

    let reviewCount = Number(localStorage.getItem("reviewCount")) || 0;

    reviewCount += 1;

    localStorage.setItem("reviewCount", reviewCount);

    reviewCounter.textContent = reviewCount;
}