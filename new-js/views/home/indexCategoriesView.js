import View from "../View";

export class indexCategoriesView extends View {
  _parent = document.querySelector("#index-categories__wrapper");

  _generateMarkup() {
    return `<a href="/category.html?id=${this._data.id}" class="categories">
             <img class="rounded-2xl" src="${this._data.thumbnail}" alt="">
             <h3 class="m-4">${this._data.name}</h3>
            </a>`;
  }
}

export default new indexCategoriesView();
