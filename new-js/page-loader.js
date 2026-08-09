const page = document.body.dataset.page;

const pagesJs = {
  paymentPage: () => import("./pages-and-functions/pages/payment-page"),
  profileSignin: () => import("./pages-and-functions/pages/profile-signin"),
  profileSignup: () => import("./pages-and-functions/pages/profile-signup"),
  shoppingCart: () => import("./pages-and-functions/pages/shopping-cart"),
  shoppingPersonalInfo: () =>
    import("./pages-and-functions/pages/shopping-personal-info"),
};

if (pagesJs[page]) {
  pagesJs[page]();
}
