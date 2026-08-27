// const controller = document.body.dataset.page;

// const controllerJs = {
//   productInfo: () => import("./controllers/pdoruct/productController"),
//   index: () => import("./controllers/home/homeController"),
//   categories: () => import("./controllers/categories/categoriesController.js"),
//   category: () => import("./controllers/categories/categoryController.js"),
//   productsShelf: () => import("./controllers/categories/productsShelfController.js"),
// };

// if (controllerJs[controller]) {
//   controllerJs[controller]();
// }

const controller = document.body.dataset.page;
const params = new URLSearchParams(window.location.search);

const controllerJs = {
  productInfo: () => import("./controllers/product/productController.js"),

  index: () => import("./controllers/home/homeController.js"),

  categories: () => import("./controllers/categories/categoriesController.js"),

  category: () => import("./controllers/categories/categoryController.js"),

  // this is why we need to write productsShelf like this 👇
  // productsShelf page will show more than one set of products and for that there are more than one controller using it

  // when there is _sort in the browser address
  productsShelf: () => {
    
    if (params.get("_sort") === "salesCount") {
      return import("./controllers/home/topSaleShelf.js");
    }

    // when there is id in the browser address
    if (params.has("id")) {
      return import("./controllers/categories/productsShelfController.js");
    }

    // default
    // return import("./controllers/categories/productsShelfController.js");
  },
};

if (controllerJs[controller]) {
  controllerJs[controller]();
}
