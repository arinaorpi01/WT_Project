const searchInput = document.querySelector(".search-input-wrapper input");
const searchBox = document.querySelector(".search-bar");
const categorySelect = document.getElementById("categorySelect");
const locationSelect = document.getElementById("locationSelect");
const dateInput = document.getElementById("dateInput");
const searchBtn = document.querySelector(".btn-search");
const detailButtons = document.querySelectorAll(".btn-card");
const redBtn = document.querySelector(".btn-red");
const greenBtn = document.querySelector(".btn-green");

if (searchBtn) {
  searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    clearErrors();

    let valid = true;
    let missingFields = [];

    let keywordValue = searchInput ? searchInput.value.trim() : "";
    let categoryValue = categorySelect ? categorySelect.value.trim() : "";
    let locationValue = locationSelect ? locationSelect.value.trim() : "";
    let dateValue = dateInput ? dateInput.value.trim() : "";

    let hasKeyword = keywordValue !== "";
    let hasCategory = categoryValue !== "" && categoryValue !== "Category";
    let hasLocation = locationValue !== "" && locationValue !== "Location";
    let hasDate = dateValue !== "";

    // Search box validation
    if (!hasKeyword) {
      if (searchBox) {
        searchBox.classList.add("errorBorder");
        searchBox.classList.remove("successBorder");
      }
      showError(
        searchInput,
        "searchError",
        "Please write something in the search box before clicking Search."
      );
      valid = false;
    } else if (keywordValue.length < 2) {
      if (searchBox) {
        searchBox.classList.add("errorBorder");
        searchBox.classList.remove("successBorder");
      }
      showError(
        searchInput,
        "searchError",
        "Search keyword must be at least 2 characters long."
      );
      valid = false;
    } else if (!/^[A-Za-z0-9\s-]+$/.test(keywordValue)) {
      if (searchBox) {
        searchBox.classList.add("errorBorder");
        searchBox.classList.remove("successBorder");
      }
      showError(
        searchInput,
        "searchError",
        "Keyword can only contain letters, numbers, spaces, or hyphens."
      );
      valid = false;
    } else {
      showSuccess(searchInput);
    }

    // Category validation
    if (!hasCategory) {
      if (categorySelect) {
        categorySelect.classList.add("errorBorder");
        categorySelect.classList.remove("successBorder");
      }
      missingFields.push("category");
      valid = false;
    } else {
      showSuccess(categorySelect);
    }

    // Location validation
    if (!hasLocation) {
      if (locationSelect) {
        locationSelect.classList.add("errorBorder");
        locationSelect.classList.remove("successBorder");
      }
      missingFields.push("location");
      valid = false;
    } else {
      showSuccess(locationSelect);
    }

    // Date validation
    if (!hasDate) {
      if (dateInput) {
        dateInput.classList.add("errorBorder");
        dateInput.classList.remove("successBorder");
      }
      missingFields.push("date");
      valid = false;
    } else if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(dateValue)) {
      if (dateInput) {
        dateInput.classList.add("errorBorder");
        dateInput.classList.remove("successBorder");
      }
      showError(
        dateInput,
        "searchError",
        "Please select a valid date from the calendar."
      );
      valid = false;
    } else {
      showSuccess(dateInput);
    }

    if (missingFields.length > 0) {
      let msg = "Please select " + missingFields.join(", ") + ".";
      if (!hasKeyword) {
        msg = "Please enter a search keyword and select " + missingFields.join(", ") + ".";
      }
      showError(null, "searchError", msg);
    }

    if (valid) {
      if (searchBox) {
        searchBox.classList.remove("errorBorder");
        searchBox.classList.add("successBorder");
      }
      alert("Search filters validated successfully!");
    }
  });
}

// View Details button validation
detailButtons.forEach(function (button) {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    clearErrors();

    let card = button.closest(".card");
    let titleEl = card ? card.querySelector("h3") : null;
    let infoParagraphs = card ? card.querySelectorAll("p") : [];

    let itemTitle = titleEl ? titleEl.textContent.trim() : "";
    let locationText = infoParagraphs[0] ? infoParagraphs[0].textContent.replace("Location:", "").trim() : "";
    let dateText = infoParagraphs[1] ? infoParagraphs[1].textContent.replace("Date:", "").trim() : "";

    if (!card || itemTitle === "" || locationText === "" || dateText === "") {
      showError(
        button,
        "detailError",
        "Item details are incomplete and cannot be viewed."
      );
      return;
    }

    showSuccess(button);
    alert(
      "Item Details Verified:\n" +
      "Item: " + itemTitle + "\n" +
      "Location: " + locationText + "\n" +
      "Date: " + dateText
    );
  });
});

// Action button validation (Report Lost / Report Found)
if (redBtn) {
  redBtn.addEventListener("click", function () {
    clearErrors();
    showSuccess(redBtn);
  });
}

if (greenBtn) {
  greenBtn.addEventListener("click", function () {
    clearErrors();
    showSuccess(greenBtn);
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

  let fields = document.querySelectorAll("input, select, textarea, button, .search-bar");
  fields.forEach(function (field) {
    field.classList.remove("errorBorder");
    field.classList.remove("successBorder");
  });
}
