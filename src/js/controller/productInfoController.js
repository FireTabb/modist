import {model, submitHandler} from "./controller.js";
import productView from "../views/productView.js";
import productsModel from "../../../new-js/models/products/productsModel.js";
import brandsModel from "../../../new-js/models/brands/brandsModel.js";
import categoryModel from "../../../new-js/models/category/categoryModel.js";
import state from "../../../new-js/models/state.js";


const controlLoadProduct = async function () {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));
  
  await productsModel.loadOne(id)
  // data.brand_info=await brandsModel.getOne(data.brandId)
  // data.category= await categoryModel.getOne(1)

  console.log(state.product);
  // await model.loadProduct(id);

  productView.render(state.product);
  productView.addFormEvent(submitHandler);
  

  document.dispatchEvent(new CustomEvent("controllerDone"));
};
controlLoadProduct();