import productsModel from "../../models/products/productsModel.js";
import categoryModel from "../../models/category/categoryModel.js";

import productsShelf from "../../views/categories/productsShelf.js";
import titleView from "../../views/titleView.js";

import searchView from "../../behaviors/functionalities/searchView.js";

// import productsObjCreator from "../controllerFunctionalities/productsObj.js";
import getProductsData from "../controllerFunctionalities/productsObj.js";

const controlTopShelfShelf = async function () {
  try {
    const params = new URLSearchParams(window.location.search);
    const field = params.get("_sort");

    const topSale = await productsModel.getByField(field);
    const topSaleProductsObj = await getProductsData(topSale.slice(0, 20));

    const title = { name: "20 محصول پر فروش" };

    await titleView.render(title.name);
    await titleView.returnBtnHandler();

    productsShelf.renderCards(topSaleProductsObj);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const init = async function () {
  await controlTopShelfShelf();
  await searchView.searchHandler();
  document.dispatchEvent(new CustomEvent("controllerDone"));
};
init();
