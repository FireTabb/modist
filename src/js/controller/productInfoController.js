import {model, submitHandler} from "./controller.js";
import productView from "../views/productView.js";


const controlLoadProduct = async function () {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));
  

  await model.loadProduct(id);

  productView.render(model.state.product);
  productView.addFormEvent(submitHandler);

  document.dispatchEvent(new CustomEvent("controllerDone"));
};
controlLoadProduct();