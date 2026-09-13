import productsModel from "../../models/products/productsModel.js";

import productsShelf from "../../views/categories/productsShelf.js";
import titleView from "../../views/titleView.js";

import searchView from "../../behaviors/functionalities/searchView.js";
import sortAndFilterView from "../../behaviors/functionalities/sortAndFilterView.js";
import formOneInputActivateView from "../../behaviors/functionalities/formOneInputActivateView.js";

import { getErrorMessage } from "../../behaviors/errorHandling/uiMessages.js";

import getProductsData from "../controllerFunctionalities/productsObj.js";

const controlproductsShelf = async function () {
  try {
    const params = new URLSearchParams(window.location.search);
    const searchedValue = params.get("search").trim().toLowerCase();
    if (!searchedValue) return;

    const data = await productsModel.getAll();

    const matchedProducts = data.filter((product) =>
      product.title.toLowerCase().includes(searchedValue),
    );

    if (matchedProducts.length < 1) {
      window.location.assign("not-fount-page.html");
      return;
    }

    const productsObj = await getProductsData(matchedProducts);

    const titleInfo = {
      name: "",
      length: productsObj.length,
    };

    await titleView.render(searchedValue);
    await titleView.inventoryStock(titleInfo);

    productsShelf.renderCards(productsObj);
  } catch (err) {
    console.error(err);
    productsShelf.renderMessage("error", getErrorMessage(err));
  }
};

const init = async function () {
  await controlproductsShelf();
  await titleView.returnBtnHandler();
  await searchView.searchHandler();
  await sortAndFilterView.sortAndFilterHandler();
  await formOneInputActivateView.oneInputActivateHandler();
  await formOneInputActivateView.priceRangeHandler();
};
init();
