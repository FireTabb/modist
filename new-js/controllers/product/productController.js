import productsModel from "../../models/products/productsModel.js";
import productView from "../../views/product/productView.js";

import categoryModel from "../../models/category/categoryModel.js";

// import productsObjCreator from "../controllerFunctionalities/productsObj.js";
import formatProduct from "../controllerFunctionalities/formatProduct.js";

import titleView from "../../views/titleView.js";
import { getErrorMessage } from "../../behaviors/errorHandling/uiMessages.js";

const controlProduct = async function () {
  try {
    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));

    const product = await productsModel.getOne(id);

    const productsSubCat = await categoryModel.getOne(product.categoryId);
    const formattedProduct = formatProduct(product);

    // const dataObj = await productsObjCreator(product);

    await productView.render(formattedProduct);
    await titleView.render(productsSubCat.name);
    await titleView.returnBtnHandler();
  } catch (err) {
    console.error(err);
    productView.renderMessage("error", getErrorMessage(err));
  }
};

const init = async function () {
  await controlProduct();
  productView.bindFormValidation();

  document.dispatchEvent(new CustomEvent("controllerDone"));
};
init();
