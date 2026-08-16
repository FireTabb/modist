import View from "../View.js";

export class categoryView extends View {
  _parent = document.querySelector("#categories__wrapper");

  categoryRender(categories, productsMap) {
    // remove categories with no product
    for (const [key, value] of productsMap) {
      if (!value.length < 1) continue;
      const index = categories.findIndex((cat) => +cat.id === key);

      if (index !== -1) {
        categories.splice(index, 1);
      }
    }

    // add categories in the page
    categories.forEach((category) => {
      this._data = category;
      const categoryMarkup = this._generateMarkup();
      this._parent.insertAdjacentHTML("beforeend", categoryMarkup);

      // add products in the category (products are sorted by category in the productMap)
      for (const [key, value] of productsMap) {
        if (value.length < 1) continue;
        value.slice(0, 8).forEach((pro) => {
          if (pro.categoryId === +category.id) {
            this._data = pro;
            const productMarkup = this.cardMarkup;
            const productParent = document.querySelector(
              `#sub-category__${category.id}`,
            );
            productParent.insertAdjacentHTML("beforeend", productMarkup);
          }
        });
      }
    });
  }

  _generateMarkup() {
    return `
    <section class="section-layout" data-section="mantos">
      <div class="container">
        <div class="title-showmore">
          <h2 class="title-primary">${this._data.name}</h2>
          <a href="producs-female-mantos.html" class="show-more">مشاهده بیشتر</a>
        </div>
      </div>

      <div class="best-seller-slider overflow-x-hidden swiper-initialized swiper-horizontal swiper-rtl swiper-backface-hidden">
        <div class="swiper-wrapper" id="sub-category__${this._data.id}">
        </div>
      </div>
    </section>
    `;
  }
}
export default new categoryView();
