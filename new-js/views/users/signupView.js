import View from "../View";
import changeTranslateX from "../../behaviors/functionalities/changeX";

export class SignupView extends View {
  _phoneNumberInput = document.querySelector("#phone__input");
  _enterPhoneSubmit = document.querySelector("#enter-phone__apply-btn");
  _editPhoneBtn = document.querySelector("#edit-phone__btn");
  _codeInputs = document.querySelectorAll(".phone__input");
  _formApply = document.querySelector(".form__apply-btn");
  _phoneError = document.querySelector("#phone-error");
  _signupWrappers = document.querySelectorAll(".signup_wraper");

  _translateButtons = document.querySelectorAll("[data-signup-page]");

  getPhoneNumberHandler(handler) {
    this._formApply.addEventListener("click", (e) => {
      e.preventDefault();
      handler(this._phoneNumberInput.value);
    });
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
  // // submit and go to code page
  // enterPhoneSubmit.addEventListener("click", function (e) {
  //   e.preventDefault();
  //   changeTranslateX(signupWrappers, 2);
  // });
  // // back to enter number page
  // editPhoneBtn.addEventListener("click", function (e) {
  //   e.preventDefault();
  //   changeTranslateX(signupWrappers, 1);
  // });

  codeInputHandler(user) {
    this._codeInputs.forEach((input, i) => {
      input.addEventListener("input", () => {
        if (!input.value) return;

        const isLastInput = i === this._codeInputs.length - 1;

        if (isLastInput) {
          if (user) {
            console.log(user);
            
            window.location.assign(`profile.html?id=${user.id}`);
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
}
export default new SignupView();
