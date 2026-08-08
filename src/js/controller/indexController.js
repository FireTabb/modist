import { model } from "./controller.js";
import indexWonderfulDiscountView from "../views/indexWonderfulDiscountView.js";
import indexTopSaleView from "../views/indexTopSaleView.js";

import productsModel from "../../../new-js/models/products/productsModel.js";
import categoryModel from "../../../new-js/models/category/categoryModel.js";

const controlDiscountProduct = async function () {
  await model.loadDiscountProducts();

  indexWonderfulDiscountView.renderCards(model.state.products);

  document.dispatchEvent(new CustomEvent("controllerDone"));
};

const controlTopSaleProduct = async function () {
  await model.loadTopSaleProducts();

  indexTopSaleView.renderCards(model.state.products);

  document.dispatchEvent(new CustomEvent("controllerDone"));
};

const init = async function () {
  await controlDiscountProduct();
  await controlTopSaleProduct();
  const categories=await categoryModel.getMains()
};
init();