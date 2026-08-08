import {model, submitHandler} from "./controller.js";
import productView from "../views/productView.js";
import productsModel from "../../../rsc/models/products/productsModel.js";
import brandsModel from "../../../rsc/models/brands/brandsModel.js";
import categoryModel from "../../../rsc/models/category/categoryModel.js";


const controlLoadProduct = async function () {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));
  
  const data=await productsModel.getOne(id)
  data.brand_info=await brandsModel.getOne(data.brandId)
  data.category= await categoryModel.getOne(1)
  console.log(data);
  await model.loadProduct(id);

  productView.render(model.state.product);
  productView.addFormEvent(submitHandler);

  document.dispatchEvent(new CustomEvent("controllerDone"));
};
controlLoadProduct();