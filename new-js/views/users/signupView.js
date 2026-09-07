import View from "../View";
import changeTranslateX from "../../behaviors/functionalities/changeX";
import {
  secondsCounter,
  clearTimer,
} from "../../behaviors/functionalities/timer";

export class SignupView extends View {
  _phoneNumberInput = document.querySelector("#phone__input");
  _enterPhoneSubmit = document.querySelector("#enter-phone__apply-btn");
  _editPhoneBtn = document.querySelector("#edit-phone__btn");
  _resendTimerWrapper = document.querySelector("#resend-timer__wrapper");
  _codeInputs = document.querySelectorAll(".phone__input");
  _formApply = document.querySelector(".form__apply-btn");
  _phoneError = document.querySelector("#phone-error");
  _signupWrappers = document.querySelectorAll(".signup_wraper");
  _translateButtons = document.querySelectorAll("[data-signup-page]");

  _showPass = document.querySelector("#show-password");
  _usernameInput = document.querySelector("#username__input");
  _passwordInput = document.querySelector("#password__input");
  _signupBtn = document.querySelector("#signup__apply-btn");

  getPhoneNumberHandler(handler) {
    this._formApply.addEventListener("click", (e) => {
      e.preventDefault();
      handler(this._phoneNumberInput.value);
    });
  }

  clearInterval() {
    clearTimer();
  }

  resendTimerHandler(time) {
    secondsCounter(time, (seconds) => {
      if (seconds > 0) {
        this._resendTimerWrapper.innerHTML = seconds;
      }
    });
  }

  resetCodeTimerHandler() {
    this._resendTimerWrapper.innerHTML = 120;
    this._editPhoneBtn.addEventListener("click", clearTimer);
  }

  phonePrevieRender(data) {
    const phonePreviewWrapper = document.querySelector(
      "#phone-preview__wrapper",
    );
    phonePreviewWrapper.innerHTML = "";
    this._renderTo(data, phonePreviewWrapper);
  }

  phonNumberCheckHandler() {
    // phon number enable send code btn & number check
    this._phoneNumberInput.addEventListener("input", () => {
      if (this._phoneNumberInput.checkValidity()) {
        this._phoneError.classList.add("hidden");
        this._formApply.removeAttribute("disabled");
      } else {
        this._phoneError.classList.remove("hidden");
        this._formApply.setAttribute("disabled", "");
      }
      return this._phoneNumberInput.value;
    });
  }

  changeSignupPageHandler() {
    this._translateButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const page = Number(button.dataset.signupPage);
        changeTranslateX(this._signupWrappers, page);
      });
    });
  }

  codeInputHandler(user) {
    this._codeInputs.forEach((input, i) => {
      input.addEventListener("input", () => {
        if (!input.value) return;

        const isLastInput = i === this._codeInputs.length - 1;

        if (isLastInput) {
          if (user) {
            window.location.assign(`welcome-page.html`);
            // window.location.assign(`profile.html?id=${user.id}`);
            return;
          }
          changeTranslateX(this._signupWrappers, 3);
        } else {
          this._codeInputs[i + 1].focus();
        }
      });

      input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && !input.value && i > 0) {
          this._codeInputs[i - 1].focus();
        }
      });
    });
  }

  signupHandlers() {
    // show password when signing up
    this._showPass.addEventListener("input", () => {
      if (this._showPass.checked) {
        this._passwordInput.type = "text";
      } else {
        this._passwordInput.type = "password";
      }
    });

    // enable and disable signup btn and show error for username
    this._usernameInput.addEventListener("input", () => {
      this._usernameInput.value === ""
        ? document.querySelector("#username-error").classList.remove("hidden")
        : document.querySelector("#username-error").classList.add("hidden");

      if (
        this._usernameInput.value !== "" &&
        this._passwordInput.value !== ""
      ) {
        this._signupBtn.removeAttribute("disabled");
      } else {
        this._signupBtn.setAttribute("disabled", "");
      }
    });
    // enable and disable signin btn and show error for password
    this._passwordInput.addEventListener("input", () => {
      this._passwordInput === ""
        ? document.querySelector("#password-error").classList.remove("hidden")
        : document.querySelector("#password-error").classList.add("hidden");

      if (
        this._usernameInput.value !== "" &&
        this._passwordInput.value !== ""
      ) {
        this._signupBtn.removeAttribute("disabled");
      } else {
        this._signupBtn.setAttribute("disabled", "");
      }
    });

    // if username and password was correct go to success page
    this._signupBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.assign(`welcome-page.html`);
      // changeTranslateX(document.querySelectorAll(".signin_wraper"), 2);
    });
  }
}
export default new SignupView();
