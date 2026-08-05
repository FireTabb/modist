export default class View {
  _data;
  _form = null;
  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    
    this._parent.insertAdjacentHTML("afterbegin", markup);
    this._form = this._parent.querySelector("form");
  }

  renderCards(products) {
    products.forEach((product) => {
      this.render(product);
    });
  }

    addFormEvent(handler) {
    this._form.addEventListener("change", function () {
      handler(this);
    });
  }
}
