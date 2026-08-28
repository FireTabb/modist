import productsModel from "../../models/products/productsModel.js";
import categoryModel from "../../models/category/categoryModel.js";

import productsShelf from "../../views/categories/productsShelf.js";
import titleView from "../../views/titleView.js";

import searchView from "../../behaviors/functionalities/searchView.js";
import sortAndFilterView from "../../behaviors/functionalities/sortAndFilterView.js";
import formOneInputActivateView from "../../behaviors/functionalities/formOneInputActivateView.js";

import productsObjCreator from "../controllerFunctionalities/productsObj.js";

const controlproductsShelf = async function () {
  try {
    const params = new URLSearchParams(window.location.search);
    const subCategoryId = Number(params.get("id"));

    const subcatInfo = await categoryModel.getOne(subCategoryId);

    const data = await productsModel.getByCategory(subCategoryId);

    const productsObj = await productsObjCreator(data);

    subcatInfo.length = productsObj.length;

    await titleView.render(subcatInfo.name);
    await titleView.inventoryStock(subcatInfo);
    await titleView.returnBtnHandler();

    productsShelf.renderCards(productsObj);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const init = async function () {
  await controlproductsShelf();
  await searchView.searchHandler();
  await sortAndFilterView.sortAndFilterHandler();
  await formOneInputActivateView.oneInputActivateHandler()
  await formOneInputActivateView.priceRangeHandler()
  document.dispatchEvent(new CustomEvent("controllerDone"));
};
init();
