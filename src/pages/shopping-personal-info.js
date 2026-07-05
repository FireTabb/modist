import changeTranslateX from "./../functionalities/changeX.js";

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

shoppingPersonalInfoForm?.addEventListener("input", function () {
  this.checkValidity()
    ? sendInfoSubmit.removeAttribute("disabled")
    : sendInfoSubmit.setAttribute("disabled", "");
});

myselfAndPresentWrapper?.addEventListener("change", function (e) {
  const presentRadio = e.target.closest("#present");
  const myselfRadio = e.target.closest("#myself");

  if (!presentRadio && !myselfRadio) return;
  if (presentRadio) {
    presentPanel.classList.remove("hidden");
    presentPanelInputs.forEach((el) => el.removeAttribute("disabled"));
  }
  if (myselfRadio) {
    presentPanel.classList.add("hidden");
    presentPanelInputs.forEach((el) => el.setAttribute("disabled", ""));
  }
});

let currentPage = 1;
shoppingPersonalInfoForm?.addEventListener("submit", function (e) {
  if (currentPage < 3) {
    e.preventDefault();
    currentPage++;
    changeTranslateX(sendInfoWrappers, currentPage);
  }
  if (currentPage === 3) {
    sendInfoSubmit.querySelector("span").innerText = "تایید اطلاعات ارسال";
  }
});

document.querySelectorAll(".return__icon").forEach((returnBtn) =>
  returnBtn.addEventListener("click", function () {
    currentPage--;
    changeTranslateX(sendInfoWrappers, currentPage);
    sendInfoSubmit.querySelector("span").innerText = "ادامه خرید";
  }),
);
