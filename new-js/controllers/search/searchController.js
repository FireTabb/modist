import productsModel from "../../models/products/productsModel.js";

import productsShelf from "../../views/categories/productsShelf.js";
import titleView from "../../views/titleView.js";

import searchView from "../../behaviors/functionalities/searchView.js";
import sortAndFilterView from "../../behaviors/functionalities/sortAndFilterView.js";
import formOneInputActivateView from "../../behaviors/functionalities/formOneInputActivateView.js";

import productsObjCreator from "../controllerFunctionalities/productsObj.js";

const controlproductsShelf = async function () {
  try {
    const params = new URLSearchParams(window.location.search);
    const searchedValue = params.get("search").trim().toLowerCase();
    if (!searchedValue) return;

    const data = await productsModel.getAll();

    const matchedProducts = data.filter((product) =>
      product.title.toLowerCase().includes(searchedValue),
    );

    // if (matchedProducts.length < 1) {
    //   productsShelf.searchNotFound();
    // }

    const productsObj = await productsObjCreator(matchedProducts);

    const titleInfo = {
      name: "",
      length: productsObj.length,
    };

    await titleView.render(searchedValue);
    await titleView.inventoryStock(titleInfo);
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
  await formOneInputActivateView.oneInputActivateHandler();
  await formOneInputActivateView.priceRangeHandler();
};
init();
