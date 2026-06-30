const priceRangeRadio = document.querySelector("#price-range");
const priceRangeStart = document.querySelector("#price-range__start");
const priceRangeEnd = document.querySelector("#price-range__end");
const priceInputOverlays = document.querySelectorAll(".input-overlay");

// price range, active and other shits
const activatePriceRange = function () {
  if (priceRangeRadio.checked) {
    priceRangeStart.removeAttribute("disabled");

    priceRangeEnd.removeAttribute("disabled");
    priceInputOverlays.forEach((input) => input.classList.add("hidden"));

    priceRangeStart.focus();
  }
  if (!priceRangeRadio.checked) {
    priceRangeStart.setAttribute("disabled", "");
    priceRangeEnd.setAttribute("disabled", "");
    priceInputOverlays.forEach((input) => input.classList.remove("hidden"));
  }
};

document
  .querySelectorAll(".price-radio")
  .forEach((radioEl) => radioEl.addEventListener("change", activatePriceRange));

priceInputOverlays.forEach((priceTextBox) =>
  priceTextBox.addEventListener("click", function (e) {
    priceRangeRadio.checked = true;
    activatePriceRange();
    priceTextBox.classList.add("hidden");
  }),
);
