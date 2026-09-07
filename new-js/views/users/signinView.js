import View from "../View";

export class SigninView extends View {
  _showPass = document.querySelector("#show-password");
  _usernameInput = document.querySelector("#username__input");
  _passwordInput = document.querySelector("#password__input");
  _signinBtn = document.querySelector("#signin__apply-btn");

  signinHandlers() {
    // show password when signing in
    this._showPass.addEventListener("input", () => {
      if (this._showPass.checked) {
        this._passwordInput.type = "text";
      } else {
        this._passwordInput.type = "password";
      }
    });

    // enable and disable signin btn and show error for username
    this._usernameInput.addEventListener("input", () => {
        document.querySelector("#username-error").classList.remove("hidden")
        
      this._usernameInput.value === ""
        ? document.querySelector("#username-error").classList.remove("hidden")
        : document.querySelector("#username-error").classList.add("hidden");

      if (
        this._usernameInput.value !== "" &&
        this._passwordInput.value !== ""
      ) {
        this._signinBtn.removeAttribute("disabled");
      } else {
        this._signinBtn.setAttribute("disabled", "");
      }
    });
    // enable and disable signin btn and show error for password
    this._passwordInput.addEventListener("input", () => {
      this._passwordInput.value === ""
        ? document.querySelector("#password-error").classList.remove("hidden")
        : document.querySelector("#password-error").classList.add("hidden");

      if (
        this._usernameInput.value !== "" &&
        this._passwordInput.value !== ""
      ) {
        this._signinBtn.removeAttribute("disabled");
      } else {
        this._signinBtn.setAttribute("disabled", "");
      }
    });

    // if username and password was correct go to success page
    this._signinBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.assign(`welcome-page.html`);
      // changeTranslateX(document.querySelectorAll(".signin_wraper"), 2);
    });
  }
}
export default new SigninView();
