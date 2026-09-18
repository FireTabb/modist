const page = document.body.dataset.page;

const pagesJs = {
  paymentPage: () => import("./behaviors/pages/payment-page"),
  shoppingCart: () => import("./behaviors/pages/shopping-cart"),
  shoppingPersonalInfo: () =>
    import("./behaviors/pages/shopping-personal-info"),
};

if (pagesJs[page]) {
  pagesJs[page]();
}
