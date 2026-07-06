const discountCodeCheckbox = document.querySelector("#discount-code__checkbox");
const discountCodeWrapper = document.querySelector("#discount-code__wrapper");
const discountCodeInput = document.querySelector("#discount-code__input");
const discountCodeApplyBtn = document.querySelector(
  "#discount-code__apply-btn",
);

// add discount code input if user had a discount code
discountCodeCheckbox?.addEventListener("change", function () {
  if (this.checked) {
    discountCodeWrapper.classList.toggle("hidden");
    discountCodeApplyBtn.classList.toggle("hidden");
  } else {
    discountCodeWrapper.classList.toggle("hidden");
    discountCodeApplyBtn.classList.toggle("hidden");
  }
});

// enable apply discount btn when there was a something in discount code input
discountCodeInput?.addEventListener("input", function (e) {
  const textbox = e.target.closest("input");

  this.value !== ""
    ? discountCodeApplyBtn.removeAttribute("disabled")
    : discountCodeApplyBtn.setAttribute("disabled", "");
});
