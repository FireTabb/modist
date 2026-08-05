import { model } from "./controller.js";
import indexWonderfulDiscountView from "../views/indexWonderfulDiscountView.js";

const controlDiscountProduct = async function () {
  await model.loadDiscountProducts();

  indexWonderfulDiscountView.renderCards(model.state.products);

  document.dispatchEvent(new CustomEvent("controllerDone"));
};
controlDiscountProduct();
