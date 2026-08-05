import View from "./View";

export class indexWonderfulDiscountView extends View {
  _parent = document.querySelector("#wonderful-discount__swiper");

  _generateMarkup() {
    
    return `
    <div class="swiper-slide">
        <!-- product -->
        <article class="product-card">
          <a href="product-info.html?id=${this._data.id}">
            <img src="${this._data.thumbnail}" alt="" class="product-card__image">
            <span class="product-card__badge--discount"> ${this._data.discount} </span>

            <div class="product-card__body">
              <p class="p-5-bold">برند گوچی</p>
              <h2 class="p-2-bold flex">${this._data.title}</h2>
              <del class="product-price__discounted"><span>${this._data.discountedPrice}</span>تومان</del>
              <strong class="product-price__current"><span>2,000,000</span>تومان</strong>
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
}

export default new indexWonderfulDiscountView();
