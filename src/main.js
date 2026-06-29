import "./slider.js";

const openSearchbtn = document.querySelector(".search__fake");
const returnBtns = document.querySelectorAll(".return__icon--header");
const searchSection = document.querySelector(".search__wraper");
const searchInput = document.querySelector(".search__input");

const filterAndSortWraper = document.querySelector(".filter-and-sort__wraper");
const bluredLable = document.querySelector("#blur-lable");

const sortWindow = document.querySelector("#sort-wraper");
const sortDrag = document.querySelector("#sort__drag-handler");

const priceRangeRadio = document.querySelector("#price-range");
const priceRangeStart = document.querySelector("#price-range__start");
const priceRangeEnd = document.querySelector("#price-range__end");
const priceInputOverlays = document.querySelectorAll(".input-overlay");

const form = document.querySelector(".form");
const formApply = document.querySelector(".form__apply-btn");

const formShowSizeGuide = document.querySelector("#open__size-guide");
const formSizeGuide = document.querySelector("#size-guide");

const filterReset = document.querySelector("#filter__reset-btn");

const phonNumberInput = document.querySelector("#phone__input");

const enterPhoneSubmit = document.querySelector("#enter-phone__apply-btn");
const editPhoneBtn = document.querySelector("#edit-phone__btn");
const enterPhoneWraper = document.querySelector("#enter-phone__wraper");
const enterCodeWraper = document.querySelector("#enter-code__wraper");
const codeInputs = document.querySelectorAll(".phone__input");

const usernamePasswordWraper = document.querySelector(
  "#username-password__wraper",
);
const successPageWraper = document.querySelector("#success-page__wraper");
const showPass = document.querySelector("#show-password");
const usernameInput = document.querySelector("#username__input");
const passwordInput = document.querySelector("#password__input");
const signinBtn = document.querySelector("#signin__apply-btn");

const dicountCodeCheckbox = document.querySelector("#discount-code__checkbox");
const dicountCodeWrapper = document.querySelector("#discount-code__wrapper");
const dicountCodeInput = document.querySelector("#discount-code__input");
const dicountCodeApplyBtn = document.querySelector("#discount-code__apply-btn");

const changeTranslateX = function (wrapers, pageNum = 1) {
  wrapers.forEach((wraper, index) => {
    wraper.style.transform = `translateX(${(pageNum - (index + 1)) * 100}%)`;
    console.log(wraper);
  });
};

if (openSearchbtn) {
  openSearchbtn.addEventListener("click", function (e) {
    searchSection.classList.toggle("hidden");
    searchInput.focus();
    document.body.classList.add("no-scroll");
  });
}

if (returnBtns) {
  returnBtns.forEach((btn) =>
    btn.addEventListener("click", function () {
      searchSection.classList.toggle("hidden");
      document.body.classList.remove("no-scroll");
    }),
  );
}

// filter and sortby wraper
filterAndSortWraper?.addEventListener("click", function (e) {
  const sortBtn = e.target.closest("#sort__btn");
  // const filterBtn = e.target.closest("#filter__btn");

  if (!sortBtn) return;

  if (sortBtn) {
    sortWindow.style.transform = `translateY(0)`;
    bluredLable.classList.remove("hidden");
  }

  document.body.classList.add("no-scroll");
});

bluredLable?.addEventListener("click", function () {
  sortWindow.style.transform = `translateY(100%)`;
  bluredLable.classList.add("hidden");
  document.body.classList.remove("no-scroll");
});

// drag to dismiss
let startY = 0;
let currentY = 0;

sortDrag?.addEventListener("touchstart", function (e) {
  startY = e.touches[0].clientY;
});

sortDrag?.addEventListener("touchmove", function (e) {
  sortWindow.classList.remove("translate-y-full");
  sortWindow.classList.remove("transition-primary");

  currentY = e.touches[0].clientY - startY;
  if (currentY < 0) return;

  sortWindow.style.transform = `translateY(${currentY}px)`;
});

sortDrag?.addEventListener("touchend", () => {
  sortWindow.classList.add("transition-primary");

  if (currentY < 150) {
    sortWindow.style.transform = `translateY(0)`;
  } else {
    sortWindow.style.transform = `translateY(100%)`;
    bluredLable.classList.add("hidden");
    document.body.classList.remove("no-scroll");
  }
  currentY = 0;
});

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

// disable form buttons function
const disableFormBtns = function () {
  if (formsApplyed > 0) {
    formApply.removeAttribute("disabled");
    filterReset?.removeAttribute("disabled");
  }
  if (formsApplyed <= 0) {
    formApply.setAttribute("disabled", "");
    filterReset?.setAttribute("disabled", "");
  }
};

// form apply and reset activate after select a form option
let formsApplyed = 0;
form?.addEventListener("click", function (e) {
  const input = e.target.closest("input");
  if (!input) return;

  if (formsApplyed < 0) {
    formsApplyed = 0;
  }

  input?.checked ? formsApplyed++ : formsApplyed--;

  disableFormBtns();
});
// reset forms
filterReset?.addEventListener("click", function (e) {
  const resetBtn = e.target.closest("#filter__reset-btn");

  if (!resetBtn) return;

  formsApplyed = 0;
  form.reset();

  disableFormBtns();
});

// close sizeGuide window
formShowSizeGuide?.addEventListener("click", function () {
  formSizeGuide.showModal();
});
formSizeGuide?.addEventListener("click", function (e) {
  if (e.target === formSizeGuide) {
    formSizeGuide.close();
  }
});

// phon number enable send code btn & number check
phonNumberInput?.addEventListener("input", function () {
  if (this.value !== "" && this.value.length >= 11) {
    document.querySelector("#phone-error").classList.add("hidden");
    formApply.removeAttribute("disabled");
  } else {
    document.querySelector("#phone-error").classList.remove("hidden");
    formApply.setAttribute("disabled", "");
  }
});

// submit and go to code page
enterPhoneSubmit?.addEventListener("click", function (e) {
  e.preventDefault();
  changeTranslateX(document.querySelectorAll(".signin_wraper"), 2);
});
// back to enter number page
editPhoneBtn?.addEventListener("click", function (e) {
  e.preventDefault();
  changeTranslateX(document.querySelectorAll(".signin_wraper"), 1);
});

// go next or previous code input
codeInputs?.forEach((input, i) => {
  input.addEventListener("input", () => {
    if (input.value && i < codeInputs.length - 1) {
      codeInputs[i + 1].focus();
    }
  });
  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && !input.value && i > 0) {
      codeInputs[i - 1].focus();
    }
  });
});

// show password when signing in
showPass?.addEventListener("input", function () {
  if (this.checked) {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
});

// enable and disable signin btn and show error
usernameInput?.addEventListener("input", function () {
  this.value === ""
    ? document.querySelector("#username-error").classList.remove("hidden")
    : document.querySelector("#username-error").classList.add("hidden");

  if (usernameInput.value !== "" && passwordInput.value !== "") {
    signinBtn.removeAttribute("disabled");
  } else {
    signinBtn.setAttribute("disabled", "");
  }
});
// enable and disable signin btn and show error
passwordInput?.addEventListener("input", function () {
  this.value === ""
    ? document.querySelector("#password-error").classList.remove("hidden")
    : document.querySelector("#password-error").classList.add("hidden");

  if (usernameInput.value !== "" && passwordInput.value !== "") {
    signinBtn.removeAttribute("disabled");
  } else {
    signinBtn.setAttribute("disabled", "");
  }
});

// if username and password was correct go to success page
signinBtn?.addEventListener("click", function (e) {
  e.preventDefault();
  changeTranslateX(document.querySelectorAll(".signin_wraper"), 2);
});

// add discount code input if user had a discount code
dicountCodeCheckbox?.addEventListener("change", function (e) {
  if (this.checked) {
    dicountCodeWrapper.classList.toggle("hidden");
    dicountCodeApplyBtn.classList.toggle("hidden");
  } else {
    dicountCodeWrapper.classList.toggle("hidden");
    dicountCodeApplyBtn.classList.toggle("hidden");
  }
});

// enable apply discount btn when there was a something in discount code input
dicountCodeInput?.addEventListener("input", function () {
  this.value !== ""
    ? dicountCodeApplyBtn.removeAttribute("disabled")
    : dicountCodeApplyBtn.setAttribute("disabled", "");
});
