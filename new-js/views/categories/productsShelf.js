import View from "./../View";

export class productsShelf extends View {
  _parent = document.querySelector("#products-wrpaer");

  _generateMarkup() {
    return this.cardMarkup;
  }
}

export default new productsShelf();