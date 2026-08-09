import productsModel from "../../models/products/productsModel.js";
import productView from "../../views/product/productView.js";

import brandsModel from "../../../new-js/models/brands/brandsModel.js";
import categoryModel from "../../../new-js/models/category/categoryModel.js";

import submitHandler from "./../../pages-and-functions/functionalities/form-activate-with-all-inputs.js"

const controlProduct = async function () {
  try {
    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));

    const data = await productsModel.getOne(id);
    const dataObj = await productsModel.creatProductObj(data);
    
    dataObj.brand_info = await brandsModel.getOne(dataObj.brandId);
    dataObj.category = await categoryModel.getOne(dataObj.categoryId);
    
    console.log(dataObj.brand_info, dataObj.category);
    
    console.log(dataObj);
    // await model.loadProduct(id);

    productView.render(dataObj);
    productView.addFormEvent(submitHandler);

    document.dispatchEvent(new CustomEvent("controllerDone"));
  } catch (err) {
    console.error(err);
    throw err;
  }
};
controlProduct();