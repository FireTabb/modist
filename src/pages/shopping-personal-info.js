import changeTranslateX from "./../functionalities/changeX.js";

const shoppingPersonalInfoForm = document.querySelector(
  "#shopping-send-info-form",
);

const myselfRadio = document.querySelector("#myself");
const presentRadio = document.querySelector("#present");

const goToAdressSection = document.querySelector("#goto-address-section");

const shoppingFullNameInput = document.querySelector(
  "#shopping-full-name__input",
);

shoppingPersonalInfoForm?.addEventListener("input", function () {
  this.checkValidity()
    ? goToAdressSection.removeAttribute("disabled")
    : goToAdressSection.setAttribute("disabled", "");
});

presentRadio.addEventListener("change", function(){
    this.checked ? x.classList.remove('hidden') : x.classList.add('hidden') 
})

shoppingPersonalInfoForm?.addEventListener("change", function () {});
