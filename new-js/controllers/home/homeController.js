import productsModel from "../../models/products/productsModel.js";
import brandsModel from "../../../new-js/models/brands/brandsModel.js";
import categoryModel from "../../../new-js/models/category/categoryModel.js";

import searchView from "../../behaviors/functionalities/searchView.js";
import formatProduct from "../controllerFunctionalities/formatProduct.js";
import getProductsData from "../controllerFunctionalities/productsObj.js";

import indexView from "../../views/home/indexView.js";

import { getErrorMessage } from "../../behaviors/errorHandling/uiMessages.js";

const controlCategories = async function () {
  try {
    const data = await categoryModel.getMains();

    indexView.renderHomeCategories(data);
  } catch (err) {
    console.error(err);
    indexView.renderMessage("error", getErrorMessage(err));
  }
};

const controlDiscounted = async function () {
  try {
    const data = await productsModel.getAll();

    const discounted = await data
      .filter((data) => data.discount > 20)
      .sort((a, b) => b.discount - a.discount)
      .slice(0, 5);

    const discountedProduct = [];
    for (const pro of discounted) {
      pro.brand_info = await brandsModel.getOne(pro.brandId);
      discountedProduct.push(pro);
    }

    indexView.renderHomeWonderfulDiscount(discountedProduct);
  } catch (err) {
    console.error(err);
    indexView.renderMessage("error", getErrorMessage(err));
  }
};

const controlTopSale = async function () {
  try {
    const topSale = await productsModel.getByField("salesCount");

    const topSaleProductsObj = await getProductsData(topSale.slice(0, 5));

    indexView.renderHomeTopSales(topSaleProductsObj);
  } catch (err) {
    console.error(err);
    indexView.renderMessage("error", getErrorMessage(err));
  }
};

const init = async function () {
  await controlCategories();
  await controlDiscounted();
  await controlTopSale();
  await searchView.searchHandler();
  await document.dispatchEvent(new CustomEvent("controllerDone"));
};
init();
