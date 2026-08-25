import View from "./View";

export class titleView extends View {
  _parent = document.querySelector(".title-primary");

  returnBtnHandler() {

    const backButton = document.querySelector("#return_btn");

    if (backButton) {
    }
      backButton.addEventListener("click", function (e) {
        
        e.preventDefault(); // جلوگیری از رفتار پیش‌فرض لینک (تغییر URL به #)
        window.history.back(); // برگشت به صفحه قبلی
      });
  }

  _generateMarkup() {
    return `
    ${this._data}
    `;
  }
}
export default new titleView();
