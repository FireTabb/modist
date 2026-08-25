import productsModel from "../../models/products/productsModel.js";
import productView from "../../views/product/productView.js";

import brandsModel from "../../../new-js/models/brands/brandsModel.js";
import categoryModel from "../../../new-js/models/category/categoryModel.js";

import productsObjCreator from "../controllerFunctionalities/productsObj.js";
import titleView from "../../views/titleView.js";

const controlProduct = async function () {
  try {
    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));

    const data = await productsModel.getOne(id);
    const dataObj = await productsObjCreator(data);

    const subCat = await categoryModel.getOne(data.categoryId);

    await productView.render(dataObj);
    await titleView.render(subCat.name);
    await titleView.returnBtnHandler();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const init = async function () {
  await controlProduct();
  productView.bindFormValidation();

  document.dispatchEvent(new CustomEvent("controllerDone"));
};
init();
