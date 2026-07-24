import * as model from "./model.js";

import productView from "./views/productView.js"

const loadProduct = async function () {
  await model.loadProduct;
  productView.render(model.state);
};
loadProduct();
