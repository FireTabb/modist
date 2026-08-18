export default class View {
  _data;
  _form = null;

  get cardMarkup() {
    return `
    <div class="swiper-slide">
        <!-- product -->
        <article class="product-card">
          <a href="product-info.html?id=${this._data.id}">
            <img src="${this._data.thumbnail}" alt="" class="product-card__image">
            <span class="product-card__badge--discount ${this._data.discount ? "" : "hide"}"> % ${this._data.discount} </span>

            <div class="product-card__body">
              <p class="p-5-bold">${this._data.brand_info.name}</p>
              <h2 class="p-2-bold flex">${this._data.title}</h2>
              <del class="product-price__discounted ${this._data.beforeDiscountPrice ? "" : "hide"}"><span>${this._data.beforeDiscountPrice ? this._data.beforeDiscountPrice.toLocaleString() : ""}</span>تومان</del>
              <strong class="product-price__current"><span>${this._data.price.toLocaleString()}</span>تومان</strong>
              <p class="product-card__stock">
                تنها <span class="p-5-bold">2</span> عدد موجود است
              </p>
            </div>
          </a>

          <button class="product-card__wishlist" aria-label="افزودن به علاقه‌مندی‌ها">
            <i class="iconsax" icon-name="heart"></i>
          </button>
        </article>
    </div>
    `;
  }

  render(data) {
    this._data = data;

    const markup = this._generateMarkup();

    this._parent.insertAdjacentHTML("beforeend", markup);
  }

  async renderCards(dataArr) {
    dataArr.forEach((data) => {
      this.render(data);
    });
  }
}
