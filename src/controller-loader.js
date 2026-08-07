const controller = document.body.dataset.page;

const controllerJs = {
  productInfo: () => import("./js/controller/productInfoController"),
  index: () => import("./js/controller/indexController"),
};


if (controllerJs[controller]) {
  controllerJs[controller]();
}
