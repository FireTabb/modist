import View from "./../View";

export class categoryWonderfulDiscountView extends View {
  _parent = document.querySelector("#category-wonderful-discount__swiper");

  _generateMarkup() {
    return this.cardMarkup;
  }
}

export default new categoryWonderfulDiscountView();
