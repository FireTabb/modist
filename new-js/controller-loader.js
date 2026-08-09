const controller = document.body.dataset.page;

const controllerJs = {
  productInfo: () => import("./controllers/pdoruct/productController"),
  index: () => import("./controllers/home/homeController"),
  // category: () => import("./js/controller/categoryController"),
};

if (controllerJs[controller]) {
  controllerJs[controller]();
}
