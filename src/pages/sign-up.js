import changeTranslateX from "./../functionalities/changeX.js"

const phonNumberInput = document.querySelector("#phone__input");

const enterPhoneSubmit = document.querySelector("#enter-phone__apply-btn");
const editPhoneBtn = document.querySelector("#edit-phone__btn");
const enterPhoneWraper = document.querySelector("#enter-phone__wraper");
const enterCodeWraper = document.querySelector("#enter-code__wraper");
const codeInputs = document.querySelectorAll(".phone__input");
const formApply = document.querySelector(".form__apply-btn");

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
