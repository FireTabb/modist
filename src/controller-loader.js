const controller = document.body.dataset.page;

const controllerJs = {
  productInfo: () => import("./js/controller/productInfoController"),
  index: () => import("./js/controller/index"),
};


if (controllerJs[controller]) {
  controllerJs[controller]();
}
