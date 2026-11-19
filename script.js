const searchInput = document.querySelector(".search-input-wrapper input");
const selects = document.querySelectorAll(".search-bar .select-box");
const categorySelect = selects[0];
const locationSelect = selects[1];
const dateSelect = selects[2];
const searchBtn = document.querySelector(".btn-search");

if (searchBtn) {
  searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    clearErrors();

    let valid = true;

    let hasKeyword = searchInput && searchInput.value.trim() !== "";
    let hasCategory = categorySelect && categorySelect.value !== "Category" && categorySelect.value !== "";
    let hasLocation = locationSelect && locationSelect.value !== "Location" && locationSelect.value !== "";
    let hasDate = dateSelect && dateSelect.value !== "Date" && dateSelect.value !== "";

    if (!hasKeyword && !hasCategory && !hasLocation && !hasDate) {
      showError(searchInput, "searchError", "Please enter a keyword or select a filter.");
      valid = false;
    } else if (hasKeyword && searchInput.value.trim().length < 2) {
      showError(searchInput, "searchError", "Search keyword must be at least 2 characters.");
      valid = false;
    } else if (hasKeyword) {
      showSuccess(searchInput);
    }

    if (hasCategory) {
      showSuccess(categorySelect);
    }

    if (hasLocation) {
      showSuccess(locationSelect);
    }

    if (hasDate) {
      showSuccess(dateSelect);
    }

    if (valid) {
      alert("Search Validated Successfully!");
    }
  });
}

// ---------- Functions ----------

function showError(input, errorId, message) {
  if (input) {
    input.classList.add("errorBorder");
    input.classList.remove("successBorder");
  }
  let errorEl = document.getElementById(errorId);
  if (errorEl) {
    errorEl.innerHTML = message;
  }
}

function showSuccess(input) {
  if (input) {
    input.classList.remove("errorBorder");
    input.classList.add("successBorder");
  }
}

function clearErrors() {
  let errors = document.querySelectorAll(".error");
  errors.forEach(function (item) {
    item.innerHTML = "";
  });

  let fields = document.querySelectorAll("input, select, textarea");
  fields.forEach(function (field) {
    field.classList.remove("errorBorder");
    field.classList.remove("successBorder");
  });
}