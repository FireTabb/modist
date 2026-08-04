import * as model from "./model.js";

import productView from "./views/productView.js";
import submitHandler from "./../functionalities/form-activate-with-all-inputs.js";

// swiper

const controlLoadProduct = async function () {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));

  await model.loadProduct(id);

  productView.render(model.state.produc);
  productView.addFormEvent(submitHandler);

  document.dispatchEvent(new CustomEvent("controllerDone"));
};
controlLoadProduct();



