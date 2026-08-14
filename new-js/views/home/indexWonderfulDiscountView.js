import View from "./../View";

export class indexWonderfulDiscountView extends View {
  _parent = document.querySelector("#index-wonderful-discount__swiper");

  _generateMarkup() {
    return this.cardMarkup;
  }
}

export default new indexWonderfulDiscountView();
