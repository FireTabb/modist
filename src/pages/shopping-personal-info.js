import changeTranslateX from "./../functionalities/changeX.js";
import submitHandler from "./../functionalities/form-activate-with-all-inputs.js";

const shoppingPersonalInfoForm = document.querySelector(
  "#shopping-send-info-form",
);
const sendInfoSubmit = document.querySelector("#send-info__submit");
const sendInfoWrappers = document.querySelectorAll(".send-info__wrapper");

const myselfAndPresentWrapper = document.querySelector(
  "#myself-present__radio-wrapper",
);
const presentPanel = document.querySelector("#present-panel");
const presentPanelInputs = presentPanel?.querySelectorAll("input, textarea");

const shoppingFullNameInput = document.querySelector(
  "#shopping-full-name__input",
);

const provinceBtn = document.querySelector("#province-button");
const provinceSelectionList = document.querySelector(
  "#province-selection__list",
);

const cityBtn = document.querySelector("#city-button");
const citySelectionList = document.querySelector("#city-selection__list");

const addressNameCodeCheckbox = document.querySelector(
  "#address-name__checkbox",
);

const addressNameCodeWrapper = document.querySelector("#address-name__wrapper");
const addressNameCodeInput = document.querySelector("#address-name__input");

//////////////////////////////////////////////////////////////////////////////


// add discount code input if user had a discount code
addressNameCodeCheckbox?.addEventListener("change", function () {
  if (this.checked) {
    addressNameCodeWrapper.classList.toggle("hidden");
    addressNameCodeInput.removeAttribute("disabled");
    submitHandler(shoppingPersonalInfoForm);
  } else {
    addressNameCodeWrapper.classList.toggle("hidden");
    addressNameCodeInput.setAttribute("disabled", "");
    submitHandler(shoppingPersonalInfoForm);
  }
});

shoppingPersonalInfoForm?.addEventListener("input", function () {
  submitHandler(this);
});

let currentPage = 1;
shoppingPersonalInfoForm?.addEventListener("submit", function (e) {
  if (currentPage < 3) {
    e.preventDefault();
    currentPage++;
    const currentWrapper = document.querySelector(`#wrapper-${currentPage}`);
    currentWrapper
      .querySelectorAll("input, textarea")
      .forEach((input) => input.removeAttribute("disabled"));
    addressNameCodeInput.setAttribute("disabled", "");
    changeTranslateX(sendInfoWrappers, currentPage);

    submitHandler(this);
  }
  if (currentPage === 3) {
    sendInfoSubmit.querySelector("span").innerText = "تایید اطلاعات ارسال";
    submitHandler(this);
  }
});

document.querySelectorAll(".return__icon").forEach((returnBtn) =>
  returnBtn.addEventListener("click", function () {
    const currentWrapper = document.querySelector(`#wrapper-${currentPage}`);
    currentWrapper
      .querySelectorAll("input, textarea")
      .forEach((input) => input.setAttribute("disabled", ""));
    currentPage--;
    changeTranslateX(sendInfoWrappers, currentPage);
    submitHandler(shoppingPersonalInfoForm);
    sendInfoSubmit.querySelector("span").innerText = "ادامه خرید";
  }),
);

myselfAndPresentWrapper?.addEventListener("change", function (e) {
  const presentRadio = e.target.closest("#present");
  const myselfRadio = e.target.closest("#myself");

  if (!presentRadio && !myselfRadio) return;
  if (presentRadio) {
    presentPanel.classList.remove("hidden");
    presentPanelInputs.forEach((el) => el.removeAttribute("disabled"));
    submitHandler(shoppingPersonalInfoForm);
  }
  if (myselfRadio) {
    presentPanel.classList.add("hidden");
    presentPanelInputs.forEach((el) => el.setAttribute("disabled", ""));
    submitHandler(shoppingPersonalInfoForm);
  }
});

// big fat function
const selectListHandler = function (target) {
  const ul = target.closest(".select__list");
  const li = target.closest("li");
  const formParrent = target.closest("#address-form__wrapper");

  const parrent = target.closest(".select__wrapper");
  const input = parrent.querySelector("input");
  const svg = parrent.querySelector("svg");

  if (li) {
    parrent.querySelector("span").textContent = li.textContent;
    input.value = li.dataset.value;
    ul.classList.add("hide");
    svg.classList.remove("rotate-180");
    cityBtn.removeAttribute("disabled", "");
    submitHandler(shoppingPersonalInfoForm);
    return;
  }

  const selectionList = parrent.querySelector("ul");
  const btn = parrent.querySelector("button");

  selectionList.classList.toggle("hide");
  svg.classList.toggle("rotate-180");
};

//
provinceBtn?.addEventListener("click", function (e) {
  selectListHandler(e.target);
});

provinceSelectionList?.addEventListener("click", function (e) {
  selectListHandler(e.target);
});

cityBtn?.addEventListener("click", function (e) {
  selectListHandler(e.target);
});

citySelectionList?.addEventListener("click", function (e) {
  selectListHandler(e.target);
});
