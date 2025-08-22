// CUSTOM SELECT

const dropdown = document.querySelector(".dropdown");
const toggle = dropdown.querySelector(".dropdown-toggle");
const ghostPlaceholder = toggle.querySelector(".ghost-placeholder");
const menu = dropdown.querySelector(".dropdown-menu");
const arrow = toggle.querySelector(".down-arrow");
const options = menu.querySelectorAll("li");

const liveRegion = document.createElement("div");
liveRegion.setAttribute("aria-live", "polite");
liveRegion.setAttribute("class", "visually-hidden");
document.body.appendChild(liveRegion);

function openMenu() {
  menu.style.display = "grid";
  arrow.classList.add("open");
  toggle.setAttribute("aria-expanded", "true");
}

function closeMenu() {
  menu.style.display = "none";
  arrow.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
  toggle.focus();
}

toggle.addEventListener("click", () => {
  const isOpen = menu.style.display === "grid";
  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
});

toggle.addEventListener("keydown", (e) => {
  if (e.key === " " || e.key === "Enter") {
    e.preventDefault();
    openMenu();
    options[0].focus();
  }
});

options.forEach((item, index) => {
  item.setAttribute("tabindex", 0);

  item.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      selectOption(item);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (index < options.length - 1) options[index + 1].focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (index > 0) options[index - 1].focus();
    } else if (e.key === "Escape") {
      closeMenu();
    }
  });

  item.addEventListener("click", () => selectOption(item));
});

function selectOption(item) {
  menu
    .querySelectorAll(".icon-check")
    .forEach((icon) => icon.classList.remove("selected"));
  options.forEach((opt) => opt.setAttribute("aria-selected", "false"));

  const checkIcon = item.querySelector(".icon-check");
  if (checkIcon) checkIcon.classList.add("selected");
  item.setAttribute("aria-selected", "true");

  const optionContent = item.querySelector(".option").cloneNode(true);
  ghostPlaceholder.innerHTML = "";
  ghostPlaceholder.appendChild(optionContent);

  const hiddenInput = document.getElementById("selected-plan");
  hiddenInput.value = item.dataset.value;

  liveRegion.textContent = `Selected ${item.innerText.trim()}`;

  closeMenu();
}

document.addEventListener("click", (e) => {
  if (!dropdown.contains(e.target) && menu.style.display === "grid") {
    closeMenu();
  }
});

// Default selection setup

(function setDefaultSelected() {
  const first = options[0];

  const checkIcon = first.querySelector(".icon-check");
  if (checkIcon) checkIcon.classList.add("selected");
  first.setAttribute("aria-selected", "true");

  const optionContent = first.querySelector(".option").cloneNode(true);
  ghostPlaceholder.innerHTML = "";
  ghostPlaceholder.appendChild(optionContent);
})();

// FORM
const form = document.getElementById("form");

// Clear Errors on Input
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const companyInput = document.getElementById("company");

nameInput.addEventListener("input", () => {
  const nameElement = document.getElementById("name-error");

  nameInput.classList.remove("input-error");
  nameInput.removeAttribute("aria-invalid");
  nameElement.removeAttribute("aria-label");
  nameElement.style.display = "none";
});

emailInput.addEventListener("input", () => {
  const emailElement = document.getElementById("email-error");

  emailInput.classList.remove("input-error");
  emailInput.removeAttribute("aria-invalid");
  emailElement.removeAttribute("aria-label");
  emailElement.style.display = "none";
});

phoneInput.addEventListener("input", () => {
  const phoneElement = document.getElementById("phone-error");

  phoneInput.classList.remove("input-error");
  phoneInput.removeAttribute("aria-invalid");
  phoneElement.removeAttribute("aria-label");
  phoneElement.style.display = "none";
});

companyInput.addEventListener("input", () => {
  const companyElement = document.getElementById("company-error");

  companyInput.classList.remove("input-error");
  companyInput.removeAttribute("aria-invalid");
  companyElement.removeAttribute("aria-label");
  companyElement.style.display = "none";
});

// Validators

function validateName(value) {
  if (!value.trim()) return "This field is required";
  return "";
}

function validateEmail(value) {
  if (!value.trim()) return "This field is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
    return "Please enter a valid email address";
  return "";
}

function validatePhone(value) {
  if (!value.trim()) return "This field is required";
  const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;
  if (!phoneRegex.test(value)) {
    return "Please enter a valid phone number";
  }
  return "";
}

function validateCompany(value) {
  if (!value.trim()) return "This field is required";
  return "";
}

const validators = {
  name: validateName,
  email: validateEmail,
  phone: validatePhone,
  company: validateCompany,
};

// Toast

let toastTimeout;

function showToast() {
  const toast = document.getElementById("toast");

  if (toastTimeout) {
    clearTimeout(toastTimeout);
    toast.classList.remove("visible");
    toast.setAttribute("aria-hidden", "true");
  }

  void toast.offsetWidth;

  toast.setAttribute("aria-hidden", "false");
  toast.classList.add("visible");

  toastTimeout = setTimeout(() => {
    toast.setAttribute("aria-hidden", "true");
    toast.classList.remove("visible");
    toastTimeout = null;
  }, 4000);
}

// Submission Handling
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  let isValid = true;

  for (const [field, validator] of Object.entries(validators)) {
    const errorMessage = validator(data[field]);
    const errorSpan = document.getElementById(`${field}-error`);
    const inputError = document.getElementById(field);

    if (errorMessage) {
      isValid = false;

      errorSpan.setAttribute("aria-invalid", "true");
      errorSpan.setAttribute("aria-label", errorMessage);
      inputError.classList.add("input-error");
      errorSpan.style.display = "block";
    }
  }

  if (isValid) {
    console.log("Form submitted successfuly", data);
    showToast();
    form.reset();
    document.getElementById("join").focus();
  }
});
