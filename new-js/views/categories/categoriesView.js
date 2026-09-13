import View from "../View";

export class indexCategoriesView extends View {
  _parent = document.querySelector("#main-categories__wrapper");

  _generateMarkup() {
    return this.categoryMarkup;
  }
}

export default new indexCategoriesView();
