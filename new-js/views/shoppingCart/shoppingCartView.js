import View from "./../View";

export class ShoppingCartView extends View {
  _parent = document.querySelector("#cart-products__wrapper");

  _receiptWrapper = document.querySelector("#receipt__wrapper");
  _totalPriceWrapper = this._receiptWrapper.querySelector(
    "#total-price__wrapper",
  );
  _productsDiscountWrapper = this._receiptWrapper.querySelector(
    "#products-discount__wrapper",
  );
  _totalWithDiscount = this._receiptWrapper.querySelector(
    "#total-with-discount__wrapper",
  );
  _payablePriceWrapper = this._receiptWrapper.querySelector(
    "#payable-price__wrapper",
  );

  _codeDiscountWrapper = this._receiptWrapper.querySelector(
    "#code-discount__wrapper",
  );
  _discountPrice = this._receiptWrapper.querySelector("#code-discounte__price");
  _codeDiscountTitle = this._receiptWrapper.querySelector(
    "#code-discounte__title",
  );
  _codeDiscountPercentage = this._codeDiscountTitle.querySelector("span");

  receiptRender(receipt) {
    if (receipt.codeDiscount) {
      this._discountPrice.classList.remove("hidden");
      this._codeDiscountTitle.classList.remove("hidden");
      this._codeDiscountWrapper.innerText =
        receipt.codeDiscount.toLocaleString();
      this._codeDiscountPercentage.innerText = `%${"calculating"}`;
    }

    this._totalPriceWrapper.innerText = receipt.total.toLocaleString();
    this._productsDiscountWrapper.innerText =
      receipt.productsDiscount.toLocaleString();

    this._totalWithDiscount.innerText = receipt.payable.toLocaleString();
    this._payablePriceWrapper.innerText = receipt.payable.toLocaleString();
  }

  addProductsBtns(addProHandler, removeProHandler) {
    this._parent.addEventListener("click", async (e) => {
      e.preventDefault();
      const btn = e.target;

      const addProductBtn = btn.closest('[icon-name="add"]');
      const removeProductBtn = btn.closest('[icon-name="trash"]');
      const clearProductBtn = btn.closest("#clear-product__btn");

      if (!addProductBtn && !removeProductBtn && !clearProductBtn) return;

      const productArticle = btn.closest("article");
      const quantityWrapper = btn.closest(
        ".product-shopping-card-quantity__wrapper",
      );

      if (clearProductBtn) {
        const productId = clearProductBtn.dataset.clearProductId;
        removeProHandler(productId, true);
        productArticle.remove();
        return;
      }

      const quantityDisplay = quantityWrapper.querySelector("span");

      if (addProductBtn) {
        const productId = addProductBtn.dataset.addProductId;
        const quantity = await addProHandler(productId);

        quantityDisplay.innerText = quantity;
        return;
      }

      if (removeProductBtn) {
        const productId = removeProductBtn.dataset.removeProductId;
        const quantity = await removeProHandler(productId);

        if (quantity === 0) {
          productArticle.remove();
          return;
        }
        quantityDisplay.innerText = quantity;
        return;
      }
    });
  }

  _generateMarkup() {
    return `
      <article class="shopping-layout">
        <div class="container">
          <div class="product-shopping-card">
            <div>
              <img src="public/images/manto-green-larg.png" alt="" />
            </div>
            <div class="product-shopping-card__details">
              <h2>${this._data.title}</h2>
              <div>
                <span>برند :</span>
                <p>${this._data.brand_info.name}</p>
              </div>
              <div>
                <span>رنگ : </span>
                <p>*</p>
              </div>
              <div>
                <span>سایز : </span>
                <p>*</p>
              </div>
              <div>
                <span>کد کالا : </span>
                <p> ${this._data.code}</p>
              </div>
              <div class="mt-2 flex flex-col gap-1">
              ${
                this._data.beforeDiscountPrice
                  ? `
                <del
                  class="rounded-sm px-1 bg-neutral-100 text-center text-neutral-700 decoration-neutral-900 decoration-2"
                  > ${this._data.beforeDiscountPrice.toLocaleString()} تومان</del
                >
                <strong
                  class="bg-secondary-300 px-1 rounded-sm text-center text-neutral-900"
                  >${this._data.price.toLocaleString()} تومان</strong
                >
                </div>
                `
                  : `
                <strong
                  class="bg-secondary-300 px-1 rounded-sm text-center text-neutral-900"
                  >${this._data.price.toLocaleString()} تومان</strong
                >
                </div>
              `
              }
            </div>
            
            <!-- ///// shopping cart remove edit change-quantity///// -->
            <div class="flex flex-col items-center justify-center gap-4">
              <button  id="clear-product__btn" data-clear-product-id="${this._data.id}">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.9998 29.3332C23.3332 29.3332 29.3332 23.3332 29.3332 15.9998C29.3332 8.6665 23.3332 2.6665 15.9998 2.6665C8.6665 2.6665 2.6665 8.6665 2.6665 15.9998C2.6665 23.3332 8.6665 29.3332 15.9998 29.3332Z"
                    stroke="#FF1919"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12.2266 19.7732L19.7732 12.2266"
                    stroke="#FF1919"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M19.7732 19.7732L12.2266 12.2266"
                    stroke="#FF1919"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <button class="product__edit-details">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.4"
                    d="M28 29.3335H4C3.45333 29.3335 3 28.8802 3 28.3335C3 27.7868 3.45333 27.3335 4 27.3335H28C28.5467 27.3335 29 27.7868 29 28.3335C29 28.8802 28.5467 29.3335 28 29.3335Z"
                    fill="#292D32"
                  />
                  <path
                    opacity="0.4"
                    d="M25.3598 4.63988C22.7731 2.05322 20.2398 1.98655 17.5864 4.63988L15.9731 6.25322C15.8398 6.38655 15.7864 6.59988 15.8398 6.78655C16.8531 10.3199 19.6798 13.1466 23.2131 14.1599C23.2664 14.1732 23.3198 14.1866 23.3731 14.1866C23.5198 14.1866 23.6531 14.1332 23.7598 14.0266L25.3598 12.4132C26.6798 11.1066 27.3198 9.83988 27.3198 8.55988C27.3331 7.23988 26.6931 5.95988 25.3598 4.63988Z"
                    fill="#292D32"
                  />
                  <path
                    d="M20.8131 15.3736C20.4264 15.1869 20.0531 15.0002 19.6931 14.7869C19.3998 14.6136 19.1198 14.4269 18.8398 14.2269C18.6131 14.0802 18.3464 13.8669 18.0931 13.6536C18.0664 13.6402 17.9731 13.5602 17.8664 13.4536C17.4264 13.0802 16.9331 12.6002 16.4931 12.0669C16.4531 12.0402 16.3864 11.9469 16.2931 11.8269C16.1598 11.6669 15.9331 11.4002 15.7331 11.0936C15.5731 10.8936 15.3864 10.6002 15.2131 10.3069C14.9998 9.94689 14.8131 9.58689 14.6264 9.21356C14.4398 8.81356 14.2931 8.42689 14.1598 8.06689L5.78644 16.4402C5.61311 16.6136 5.45311 16.9469 5.41311 17.1736L4.69311 22.2802C4.55977 23.1869 4.81311 24.0402 5.37311 24.6136C5.85311 25.0802 6.51977 25.3336 7.23977 25.3336C7.39977 25.3336 7.55977 25.3202 7.71977 25.2936L12.8398 24.5736C13.0798 24.5336 13.4131 24.3736 13.5731 24.2002L21.9464 15.8269C21.5731 15.6936 21.2131 15.5469 20.8131 15.3736Z"
                    fill="#292D32"
                  />
                </svg>
              </button>
              <div class="product-shopping-card-quantity__wrapper">
                <button
                  type="button"
                  class="product-shopping-card__add-quantity"
                >
                  <i class="iconsax text-white" icon-name="add" data-add-product-id="${this._data.id}"></i>
                </button>
                <span class="w-f">${this._data.quantity}</span>
                <button
                  type="button"
                  class="product-shopping-card__remove-quantity"
                >
                  <i class="iconsax text-red-500" icon-name="trash" data-remove-product-id="${this._data.id}"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    `;
  }
}
export default new ShoppingCartView();
