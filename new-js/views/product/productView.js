import View from "./../View";

export class productView extends View {
  _parent = document.querySelector("main");
  _footer = document.querySelector("footer");

  _sizeCheck(sizeValue) {
    return this._data.sizes.find((size) => size.size === sizeValue)
      ? ""
      : "disabled";
  }

  bindFormValidation() {
    this._form = this._parent.querySelector(".form");
    this._submitBtn = this._footer.querySelector('button[type="submit"]');
    this._form.addEventListener("input", () => {
      this._toggleSubmitButton();
    });
  }

  // submit handler (may be should be in main View)
  _toggleSubmitButton() {
    this._submitBtn.disabled = !this._checkValidities();
  }
  // submit function (may be should be in main View)
  _checkValidities() {
    let status = this._form.checkValidity();

    const shouldCheckFormValidity = this._form.querySelector(
      "[data-check-validity]",
    );

    if (shouldCheckFormValidity) {
      status = this._form.checkValidity();
    }

    this._form.querySelectorAll("input, textarea").forEach((i) => {
      if (!i.disabled && i.hasAttribute("required")) {
        if (!i.value) {
          status = false;
        }
        if (i.getAttribute("id") === "shopping-phone__input") {
          if (!i.value.startsWith("09") || i.value.length !== 11) {
            status = false;
          }
        }
      }
    });
    return status;
  }

  _generateMarkup() {
    return `
    <!-- toast container -->
    <div id="toast-container" aria-live="polite" aria-atomic="true" class="toast-wrapper"></div>

    <!-- page title -->
    <section class="my-5">
      <div class="container">
        <div class="page-title">
          <div class="page-title_wraper">
            <a href="index.html">
              <i class="iconsax return__icon" icon-name="arrow-right"></i>
            </a>
            <h2 class="title-primary">جزئیات مانتو</h2>
          </div>
        </div>
      </div>
    </section>

    <!-- product images -->
    <section class="">
      <div class="thumb-swiper__styles bg-primary-50 p-6">
        <div class="relative container">
          <!-- icons -->
          <div class="absolute top-8 right-0 z-10 flex h-fit w-fit flex-col gap-2 *:flex">
            <a href="#">
              <i class="iconsax bg-secondary t-2 rounded-full p-2 text-white" icon-name="heart"></i>
            </a>

            <a href="#">
              <i class="iconsax bg-secondary t-2 rounded-full p-2 text-white" icon-name="share"></i>
            </a>
            <a href="#">
              <i class="iconsax bg-secondary t-2 rounded-full p-2 text-white" icon-name="scan-3"></i>
            </a>
          </div>

          <!-- Main (up) -->
          <div class="main-swiper swiper swiper-initialized swiper-horizontal swiper-rtl swiper-backface-hidden">
            <div class="swiper-wrapper mt-6 *:flex! *:justify-center!">
              <div class="swiper-slide swiper-slide-active" style="width: 332px; margin-left: 10px;">
                <img src="images/manto-green.png">
              </div>
              <div class="swiper-slide swiper-slide-next" style="width: 332px; margin-left: 10px;">
                <img src="images/manto-green-1.png">
              </div>
              <div class="swiper-slide" style="width: 332px; margin-left: 10px;">
                <img src="images/manto-green-2.png">
              </div>
              <div class="swiper-slide" style="width: 332px; margin-left: 10px;">
                <img src="images/manto-green-3.png">
              </div>
            </div>
          </div>

          <!-- Thumbnails (down) -->
          <div class="thumbs-swiper swiper my-6 *:flex! *:justify-center! swiper-initialized swiper-horizontal swiper-rtl swiper-watch-progress swiper-backface-hidden swiper-thumbs">
            <div class="swiper-wrapper" style="transform: translate3d(0px, 0px, 0px);">
              <div class="swiper-slide swiper-slide-visible swiper-slide-fully-visible swiper-slide-active swiper-slide-thumb-active" style="width: 75.5px; margin-left: 10px;">
                <img src="images/manto-green.png">
              </div>
              <div class="swiper-slide swiper-slide-visible swiper-slide-fully-visible swiper-slide-next" style="width: 75.5px; margin-left: 10px;">
                <img src="images/manto-green-1.png">
              </div>
              <div class="swiper-slide swiper-slide-visible swiper-slide-fully-visible" style="width: 75.5px; margin-left: 10px;">
                <img src="images/manto-green-2.png">
              </div>
              <div class="swiper-slide swiper-slide-visible swiper-slide-fully-visible" style="width: 75.5px; margin-left: 10px;">
                <img src="images/manto-green-3.png">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- main informations -->
    <section class="section-layout">
      <div class="container text-neutral-900">
        <div class="product-info__name-and-price--wrapper">
          <h2>${this._data.title}</h2>
          <div class="product-info__price--wrapper">
          ${
            this._data.beforeDiscountPrice
              ? `<div>
                   <span> ${this._data.discount}% </span>
                   <del>${this._data.beforeDiscountPrice.toLocaleString()} تومان</del>
                 </div>
                <strong>${this._data.price.toLocaleString()} تومان</strong>`
              : `<div>
                 <strong>${this._data.price.toLocaleString()} تومان</strong>
                </div>`
          }
            
          </div>
        </div>

        <div class="product-info__code-and-score--wrapper">
          <span>کد : ${this._data.code}</span>
          <div class="product-info__score">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.00887 2.04754L9.03554 4.10087C9.17554 4.38671 9.54887 4.66087 9.86387 4.71337L11.7247 5.02254C12.9147 5.22087 13.1947 6.08421 12.3372 6.93587L10.8905 8.38254C10.6455 8.62754 10.5114 9.10004 10.5872 9.43837L11.0014 11.2292C11.328 12.6467 10.5755 13.195 9.32137 12.4542L7.5772 11.4217C7.2622 11.235 6.74304 11.235 6.4222 11.4217L4.67804 12.4542C3.4297 13.195 2.67137 12.6409 2.99804 11.2292L3.4122 9.43837C3.48804 9.10004 3.35387 8.62754 3.10887 8.38254L1.6622 6.93587C0.810536 6.08421 1.0847 5.22087 2.2747 5.02254L4.13554 4.71337C4.4447 4.66087 4.81804 4.38671 4.95804 4.10087L5.9847 2.04754C6.5447 0.933372 7.4547 0.933372 8.00887 2.04754Z" fill="#FCA311"></path>
            </svg>
            ${this._data.rating}
          </div>
        </div>
      </div>
    </section>
    <!-- form section -->
    <form action="" id="filter-form" class="form">
      <!-- size -->
      <section class="section-layout">
        <div class="container">
          <!-- ///// title ///// -->
          <div class="title-showmore">
            <h2 class="title-secondary">انتخاب سایز :</h2>
            <div id="open__size-guide" class="show-more">سایز من چنده؟</div>
          </div>
          <!-- ///// options ///// -->
          <div dir="ltr" class="p-3-bold grid grid-cols-6 gap-2 *:flex *:justify-center">
            <!-- ///// XS ///// -->
            <label class="text-neutral-900">
              <input  ${this._sizeCheck("XS")} required type="radio" name="size" id="size-xs" class="peer hidden">

              <span class="filter__size-btn--product-info disable-style bg-white">XS</span>
            </label>
            <!-- ///// S ///// -->
            <label class="text-neutral-900">
              <input ${this._sizeCheck("S")}  type="radio" name="size" id="size-s" class="peer hidden">
              <span class="filter__size-btn--product-info disable-style bg-white">S</span>
            </label>
            <!-- ///// M ///// -->
            <label class="text-neutral-900">
              <input ${this._sizeCheck("M")}  type="radio" name="size" id="size-m" class="peer hidden">
              <span class="filter__size-btn--product-info disable-style bg-white">M</span>
            </label>
            <!-- ///// L ///// -->
            <label class="text-neutral-900">
              <input ${this._sizeCheck("L")}  type="radio" name="size" id="size-l" class="peer hidden">
              <span class="filter__size-btn--product-info disable-style bg-white">L</span>
            </label>
            <!-- ///// XL ///// -->
            <label class="text-neutral-900">
              <input ${this._sizeCheck("XL")}  type="radio" name="size" id="size-xl" class="peer hidden">
              <span class="filter__size-btn--product-info disable-style bg-white">XL</span>
            </label>
            <!-- ///// XXL ///// -->
            <label class="text-neutral-900">
              <input ${this._sizeCheck("XXL")} type="radio" name="size" id="size-XXL" class="peer hidden">
              <span class="filter__size-btn--product-info disable-style bg-white">XXL</span>
            </label>
          </div>

          <!-- ///// giude window ///// -->
          <dialog id="size-guide" type="button" dir="ltr" class="m-auto rounded-lg outline-none">
            <div class="w-full p-3">
              <div onclick="document.getElementById('size-guide').close()" class="w-fit">
                <i class="iconsax t-2-bold" icon-name="x-circle"></i>
              </div>
              <img src="images/size-guide.png" alt="" class="m-auto">
            </div>
          </dialog>
        </div>
      </section>

      <!-- color -->
      <section class="section-layout">
        <!-- ///// title ///// -->
        <div class="container">
          <div class="title-showmore">
            <h2 class="title-secondary">انتخاب رنگ :</h2>
          </div>
        </div>

        <!-- ///// opsions ///// -->
        <div>
          <div class="grid grid-cols-4 gap-4">
            <label class="p-4-bold flex flex-col items-center justify-center gap-3 text-neutral-900">
              <input data-check-validity required type="radio" class="peer sr-only" name="color" id="purple">
              <span class="filter__color-btn--product-info"><img src="public/images/manto-test-purple.png" alt="" class=""></span>
              بنفش
            </label>
            <label class="p-4-bold flex flex-col items-center justify-center gap-3 text-neutral-900">
              <input data-check-validity type="radio" class="peer sr-only" name="color" id="black">
              <span class="filter__color-btn--product-info"><img src="public/images/manto-test-black.png" alt="" class=""></span>
              مشکی
            </label>
            <label class="p-4-bold flex flex-col items-center justify-center gap-3 text-neutral-900">
              <input data-check-validity type="radio" class="peer sr-only" name="color" id="green">
              <span class="filter__color-btn--product-info"><img src="public/images/manto-test-green.png" alt="" class=""></span>
              سبز
            </label>
            <label class="p-4-bold flex flex-col items-center justify-center gap-3 text-neutral-900">
              <input data-check-validity type="radio" class="peer sr-only" name="color" id="red">
              <span class="filter__color-btn--product-info"><img src="public/images/manto-test-red.png" alt="" class=""></span>
              قرمز
            </label>
          </div>
        </div>
      </section>
    </form>

    <!-- tabs (detail, review, comments and QA) -->
    <section>
      <!-- ///// tabs ///// -->
      <div class="bg-primary-50">
        <div class="container">
          <div class="p-3-bold flex h-12 items-center justify-between text-nowrap">
            <div class="tab__wrapper">
              <button class="tab--active" data-tab="specs">مشخصات</button>
            </div>
            <div class="tab__wrapper" data-tab="reviews">
              <button class="">بررسی محصول</button>
            </div>
            <div class="tab__wrapper" data-tab="comments">
              <button class="">نظرات کاربران</button>
            </div>
            <div class="tab__wrapper" data-tab="qa">
              <button class="">پرسش و پاسخ</button>
            </div>
          </div>
        </div>
      </div>
      <!-- ///// tab panels ///// -->
      <!-- ///// specs panel ///// -->
      <table data-panel="specs" class="tabs-specs__wrapper">
        <tbody><tr>
          <td class="title-td">جنس</td>
          <td class="info-td">نخی</td>
        </tr>
        <tr>
          <td class="title-td">طرح</td>
          <td class="info-td">ساده</td>
        </tr>
        <tr>
          <td class="title-td">یقه</td>
          <td class="info-td">برگردان</td>
        </tr>
        <tr>
          <td class="title-td">قد</td>
          <td class="info-td">۱۰۰ سانتی متر</td>
        </tr>
        <tr>
          <td class="title-td">مورد استفاده</td>
          <td class="info-td">روزمره</td>
        </tr>
        <tr>
          <td class="title-td">نحوه بسته شدن</td>
          <td class="info-td">دکمه ای</td>
        </tr>
        <tr>
          <td class="title-td">جزئیات</td>
          <td class="info-td">
            آستین بند‌دار<br>
            قد آستین، بلند<br>
            جیب‌نما<br>
            دکمه پرسی
          </td>
        </tr>
      </tbody></table>
      <!-- ///// review panel ///// -->
      <!-- ///// comments panel ///// -->
      <!-- ///// qa panel ///// -->
    </section>
    `;
  }
}
export default new productView();
