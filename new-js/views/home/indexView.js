import View from "../View";

class IndexView extends View {
  _categoriesParent = document.querySelector("#index-categories__wrapper");
  _topSalesParemt = document.querySelector("#top-sale__swiper");
  _wonderfulDiscountParent = document.querySelector(
    "#index-wonderful-discount__swiper",
  );

  renderHomeWonderfulDiscount(dataArr) {
    this.renderCards(dataArr, this._wonderfulDiscountParent);
  }
  renderHomeTopSales(dataArr) {
    this.renderCards(dataArr, this._topSalesParemt);
  }

  renderHomeCategories(dataArr) {
    dataArr.forEach((data) => {
      this._data = data;

      this._categoriesParent.insertAdjacentHTML(
        "beforeend",
        this.categoryMarkup,
      );
    });
  }

  _generateMarkup() {
    return this.cardMarkup;
  }
}

export default new IndexView();
