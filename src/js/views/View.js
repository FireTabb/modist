export default class View {
  render(data) {
    this._data = data;
    const markup = this._generateMarkup();

    this._parent.insertAdjacentHTML("afterbegin", markup);
  }
}
