import categoryModel from "../../../new-js/models/category/categoryModel.js";

import categoriesView from "../../views/categories/categoriesView.js";
import categoryWonderfulDiscountView from "../../views/categories/categoryWonderfulDiscountView.js";

const controlCategories = async function () {
  try {
    const data = await categoryModel.getMains();
    
    categoriesView.renderCards(data);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
controlCategories();
