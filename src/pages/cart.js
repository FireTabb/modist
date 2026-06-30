const dicountCodeCheckbox = document.querySelector("#discount-code__checkbox");
const dicountCodeWrapper = document.querySelector("#discount-code__wrapper");
const dicountCodeInput = document.querySelector("#discount-code__input");
const dicountCodeApplyBtn = document.querySelector("#discount-code__apply-btn");

// add discount code input if user had a discount code
dicountCodeCheckbox?.addEventListener("change", function () {
  if (this.checked) {
    dicountCodeWrapper.classList.toggle("hidden");
    dicountCodeApplyBtn.classList.toggle("hidden");
  } else {
    dicountCodeWrapper.classList.toggle("hidden");
    dicountCodeApplyBtn.classList.toggle("hidden");
  }
});

// enable apply discount btn when there was a something in discount code input
dicountCodeInput?.addEventListener("input", function (e) {
  const textbox = e.target.closest("input");
  
  this.value !== ""
    ? dicountCodeApplyBtn.removeAttribute("disabled")
    : dicountCodeApplyBtn.setAttribute("disabled", "");
});
