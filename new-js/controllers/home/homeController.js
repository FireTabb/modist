import productsModel from "../../models/products/productsModel.js";
import brandsModel from "../../../new-js/models/brands/brandsModel.js";
import categoryModel from "../../../new-js/models/category/categoryModel.js";

import searchView from "../../behaviors/functionalities/searchView.js";
import productsObjCreator from "../controllerFunctionalities/productsObj.js";

import indexWonderfulDiscountView from "../../views/home/indexWonderfulDiscountView.js";
import indexTopSaleView from "../../views/home/indexTopSaleView.js";
import indexCategoriesView from "../../views/home/indexCategoriesView.js";
// import search from "../../pages-and-functions/functionalities/search.js";
// console.log(search);

const controlCategories = async function () {
  try {
    const data = await categoryModel.getMains();

    indexCategoriesView.renderCards(data);
  } catch (err) {
    console.error(err);
    throw err;
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

    indexWonderfulDiscountView.renderCards(discountedProduct);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const controlTopSale = async function () {
  try {
    const topSale = await productsModel.getByFeild("salesCount");

    const topSaleProductsObj = await productsObjCreator(topSale.slice(0, 5));

    indexTopSaleView.renderCards(topSaleProductsObj);
  } catch (err) {
    console.error(err);
    throw err;
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
