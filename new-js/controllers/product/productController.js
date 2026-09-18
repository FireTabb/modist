import productsModel from "../../models/products/productsModel.js";
import productView from "../../views/product/productView.js";

import categoryModel from "../../models/category/categoryModel.js";

// import productsObjCreator from "../controllerFunctionalities/productsObj.js";
import formatProduct from "../controllerFunctionalities/formatProduct.js";

import titleView from "../../views/titleView.js";
import { getErrorMessage } from "../../behaviors/errorHandling/uiMessages.js";

import cartModel from "../../models/cart/cartModel.js";

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
  } catch (err) {
    console.error(err);
    productView.renderMessage("error", getErrorMessage(err));
  }
};

const controlAddProductToShoppingHandler = async function () {
  try {
    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));
    
    cartModel.addGusstProduct(id);
  } catch (err) {
    console.error(err);
    productView.renderMessage("error", getErrorMessage(err));
  }
};

const controlRemoveProductToShoppingHandler = async function () {
  try {
    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));

    const productsInCart = cartModel.removeGusstProduct(id);
  } catch (err) {
    console.error(err);
    productView.renderMessage("error", getErrorMessage(err));
  }
};

const getProductQuantityController = function () {
  try {
    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));
    return cartModel.getProductsQuantity(id);
  } catch (err) {
    console.error(err);
    productView.renderMessage("error", getErrorMessage(err));
  }
};

const init = async function () {
  productView.addProductBtns(
    controlAddProductToShoppingHandler,
    controlRemoveProductToShoppingHandler,
    getProductQuantityController(),
  );
  await titleView.returnBtnHandler();
  await controlProduct();
  productView.bindFormValidation();

  document.dispatchEvent(new CustomEvent("controllerDone"));
};
init();
