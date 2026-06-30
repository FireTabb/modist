import changeTranslateX from "./../functionalities/changeX.js"

const showPass = document.querySelector("#show-password");
const usernameInput = document.querySelector("#username__input");
const passwordInput = document.querySelector("#password__input");
const signinBtn = document.querySelector("#signin__apply-btn");

// show password when signing in
showPass?.addEventListener("input", function () {
  if (this.checked) {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
});

// enable and disable signin btn and show error for username
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
// enable and disable signin btn and show error for password
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
