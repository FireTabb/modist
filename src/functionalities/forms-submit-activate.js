const form = document.querySelector(".form");
const formApply = document.querySelector(".form__apply-btn");

const formShowSizeGuide = document.querySelector("#open__size-guide");
const formSizeGuide = document.querySelector("#size-guide");

const filterReset = document.querySelector("#filter__reset-btn");

// disable form buttons function
const disableFormBtns = function (activate = false) {
  if (activate) formsApplyed++;

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
  const customPrice = e.target.closest(".price-range__number-input");

  if (customPrice) {
    formsApplyed = 2;
  }

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

export { disableFormBtns, formsApplyed };
