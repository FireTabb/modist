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

  inventoryStock(info) {
    const parrent = document.querySelector(".inventory-stock");
    parrent.insertAdjacentHTML(
      "afterbegin",
      `تعداد ${info.name}: <span>${info.length}</span>`,
    );
  }

  _generateMarkup() {
    return `
    ${this._data}
    `;
  }
}
export default new titleView();
