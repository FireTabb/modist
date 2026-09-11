const page = document.body.dataset.page;

const pagesJs = {
  paymentPage: () => import("./behaviors/pages/payment-page"),
  // profileSignin: () => import("./behaviors/pages/profile-signin"),
  // profileSignup: () => import("./behaviors/pages/profile-signup"),
  shoppingCart: () => import("./behaviors/pages/shopping-cart"),
  shoppingPersonalInfo: () =>
    import("./behaviors/pages/shopping-personal-info"),
};

if (pagesJs[page]) {
  pagesJs[page]();
}
