import View from "./../View";

export class indexTopSaleView extends View {
  _parent = document.querySelector("#top-sale__swiper");

  _generateMarkup() {
    return this.cardMarkup;
  }
}

export default new indexTopSaleView();
