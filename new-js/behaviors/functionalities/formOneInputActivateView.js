export class formOneInputActivateView {
  _formsApplyed = 0;

  _form = document.querySelector(".form");
  _formApply = document.querySelector(".form__apply-btn");
  _filterReset = document.querySelector("#filter__reset-btn");

  _disableFormBtns(activate = false) {
    if (activate) this._formsApplyed++;

    if (this._formsApplyed > 0) {
      this._formApply?.removeAttribute("disabled");
      this._filterReset?.removeAttribute("disabled");
    }

    if (this._formsApplyed <= 0) {
      this._formApply?.setAttribute("disabled", "");
      this._filterReset?.setAttribute("disabled", "");
    }
  }

  oneInputActivateHandler() {
    const formShowSizeGuide = document.querySelector("#open__size-guide");
    const formSizeGuide = document.querySelector("#size-guide");

    // disable form buttons function

    // form apply and reset activate after select a form option

    this._form?.addEventListener("click", (e) => {
      const input = e.target.closest("input");
      const customPrice = e.target.closest(".price-range__number-input");

      if (customPrice) {
        this._formsApplyed = 2;
      }

      if (!input) return;

      if (this._formsApplyed < 0) {
        this._formsApplyed = 0;
      }

      input.checked ? this._formsApplyed++ : this._formsApplyed--;

      this._disableFormBtns();
    });

    // reset forms
    this._filterReset?.addEventListener("click", (e) => {
      const resetBtn = e.target.closest("#filter__reset-btn");
      if (!resetBtn) return;

      this._formsApplyed = 0;
      this._form?.reset();

      this._disableFormBtns();
    });

    // close sizeGuide window
    formShowSizeGuide?.addEventListener("click", function () {
      formSizeGuide.showModal();
    });
    formSizeGuide?.addEventListener("click", function (e) {
      if (e.target === formSizeGuide) {
        formSizeGuide.close();
      }
    });
  }

  priceRangeHandler() {
    const priceRangeRadio = document.querySelector("#price-range");
    const priceRangeStart = document.querySelector("#price-range__start");
    const priceRangeEnd = document.querySelector("#price-range__end");
    const priceInputOverlays = document.querySelectorAll(".input-overlay");

    // price range, active and other shits
    const activatePriceRange = function () {
      if (priceRangeRadio.checked) {
        priceRangeStart.removeAttribute("disabled");

        priceRangeEnd.removeAttribute("disabled");
        priceInputOverlays.forEach((input) => input.classList.add("hidden"));

        priceRangeStart.focus();
      }
      if (!priceRangeRadio.checked) {
        priceRangeStart.setAttribute("disabled", "");
        priceRangeEnd.setAttribute("disabled", "");
        priceInputOverlays.forEach((input) => input.classList.remove("hidden"));
      }
    };

    document
      .querySelectorAll(".price-radio")
      .forEach((radioEl) =>
        radioEl.addEventListener("change", activatePriceRange),
      );

    priceInputOverlays.forEach((priceTextBox) =>
      priceTextBox.addEventListener("click", (e) => {
        priceRangeRadio.checked = true;
        activatePriceRange();
        priceTextBox.classList.add("hidden");

        this._disableFormBtns(true);
      }),
    );
  }
}

export default new formOneInputActivateView();

// export { disableFormBtns, this._formsApplyed };
