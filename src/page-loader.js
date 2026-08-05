const page = document.body.dataset.page;


const pagesJs = {
  paymentPage: () => import("./pages/payment-page"),
  profileSignin: () => import("./pages/profile-signin"),
  profileSignup: () => import("./pages/profile-signup"),
  shoppingCart: () => import("./pages/shopping-cart"),
  shoppingPersonalInfo: () => import("./pages/shopping-personal-info"),
};

if (pagesJs[page]) {
  pagesJs[page]();
}
