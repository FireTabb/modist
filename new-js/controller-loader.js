const controller = document.body.dataset.page;

const controllerJs = {
  productInfo: () => import("./controllers/pdoruct/productController"),
  index: () => import("./controllers/home/homeController"),
  categories: () => import("./controllers/categories/categoriesController.js"),
  category: () => import("./controllers/categories/categoryController.js"),
};

if (controllerJs[controller]) {
  controllerJs[controller]();
}
