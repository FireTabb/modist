import View from "../View";

export class Profile extends View {
  _parent = document.querySelector("#username-and-balance__section");
  _exitBtn = document.querySelector("#exit__btn");

  exitBtnHandler(handler) {
    this._exitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  _generateMarkup() {
    return `
    <div class="container">
        <div class="p-1-bold flex flex-col items-center justify-center gap-3">
          <h2>${this._data.username} عزیز</h2>
          <p class="p-1-regular">
            اعتبار شما : <span class="p-1-bold">000,000 تومان</span>
          </p>
        </div>
      </div>
    `;
  }
}
export default new Profile();
