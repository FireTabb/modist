import View from "../View.js";

export class categoryView extends View {
  _parent = document.querySelector("#categories__wrapper");

  categoryRender(allData) {
    allData.forEach(({ categoryData, products }) => {
      // add categories in the page
      this._data = categoryData;
      const categoryMarkup = this._generateMarkup();
      this._parent.insertAdjacentHTML("beforeend", categoryMarkup);

      const productParent = document.querySelector(
        `#sub-category__${categoryData.id}`,
      );

      // add products in the category
      products.forEach((pro) => {
        this._data = pro;
        const productMarkup = this.cardMarkup;
        productParent.insertAdjacentHTML("beforeend", productMarkup);
      });
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
