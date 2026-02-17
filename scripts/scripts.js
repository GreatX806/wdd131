
const businessInfo = {
  name: "CleanGo Solutions",
  location: "Nigeria",
  services: ["Recycling", "Waste Pickup", "Environmental Consulting"]
};

function displayServices() {
  const container = document.querySelector("#services-container");
  if (container) {
    container.innerHTML = businessInfo.services.map(service => 
      `<div><h3>${service}</h3></div>`
    ).join("");
  }
}

function populateServiceList() {
  const list = document.querySelector("#service-list");
  if (list) {
    businessInfo.services.forEach(service => {
      list.innerHTML += `<li>${service}</li>`;
    });
  }
}

function handleFormSubmit() {
  const form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      const name = document.querySelector("#name").value;
      const email = document.querySelector("#email").value;

      if (name && email) {
        localStorage.setItem("customerName", name);
        document.querySelector("#message").textContent = `Thank you, ${name}. We will contact you soon.`;
      } else {
        document.querySelector("#message").textContent = "Please fill in all fields.";
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", function() {
  displayServices();
  populateServiceList();
  handleFormSubmit();
});
