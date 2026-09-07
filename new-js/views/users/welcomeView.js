import View from "../View";
import changeTranslateX from "../../behaviors/functionalities/changeX";

export class SignupView extends View {
  _parent = document.querySelector("main");
  _generateMarkup() {
    return `
      <!-- toast container -->
      <div
        id="toast-container"
        aria-live="polite"
        aria-atomic="true"
        class="toast-wrapper"
      ></div>

      <div class="fixed inset-0 flex">
        <!-- success page -->
        <div
          id="success-page__wraper"
          class="transition-primary absolute inset-0 gap-8"
        >
          <div class="relative h-full">
            <section class="section-layout">
              <div class="container">
                <div
                  class="logo-text mt-25 flex flex-col items-center justify-center"
                >
                  <div></div>
                  <img src="public/images/Logo.png" alt="" />
                  <p
                    class="p-1-bold mt-15 mb-4 text-neutral-900"
                    id="username__wrapper"
                  >
                    <span>${this._data}</span> عزیز
                  </p>
                  <p class="t-5-bold text-success">ورود با موفقیت انجام شد</p>
                  <a
                    href="profile.html"
                    class="form__apply-btn main-btn p-2-bold bg-primary absolute right-4 bottom-50 left-4 flex w-auto! justify-center gap-2 px-4 text-white"
                  >
                    ادامه
                    <i
                      class="iconsax t-2-bold text-white"
                      icon-name="arrow-left"
                    ></i>
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    `;
  }
}
export default new SignupView();
