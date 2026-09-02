import View from "./View";

export class titleView extends View {
  _parent = document.querySelector(".title-primary");

  returnBtnHandler(steps) {
    const backButton = document.querySelector("#return_btn");

    if (steps && backButton) {
      backButton.addEventListener("click", function (e) {
        e.preventDefault();
        window.history.go(-steps); // برگشت به دو صفحه قبلی
        return;
      });
    }

    if (backButton) {
      backButton.addEventListener("click", function (e) {
        e.preventDefault();
        window.history.back(); // برگشت به صفحه قبلی
        return;
      });
    }
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
