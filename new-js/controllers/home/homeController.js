import productsModel from "../../models/products/productsModel.js";
import brandsModel from "../../../new-js/models/brands/brandsModel.js";
import categoryModel from "../../../new-js/models/category/categoryModel.js";

import indexWonderfulDiscountView from "../../views/home/indexWonderfulDiscountView.js";
import indexTopSaleView from "../../views/home/indexTopSaleView.js";

const controlDiscounted = async function () {
  try {
    const data = await productsModel.getAll();

    const discounted = await data
      .filter((data) => data.discount > 20)
      .sort((a, b) => a.discount - b.discount)
      .slice(0, 5);

    const discountedProduct = [];
    for (const pro of discounted) {
      pro.brand_info = await brandsModel.getOne(pro.brandId);
      discountedProduct.push(pro);
    }

    indexWonderfulDiscountView.renderCards(discountedProduct);

    document.dispatchEvent(new CustomEvent("controllerDone"));
  } catch (err) {
    console.error(err);
    throw err;
  }
};


const controlTopSale = async function () {
  try {
    const data = await productsModel.getAll();
    console.log(data);
    

    const topSale = await data
      .sort((a, b) => b.saleCount - a.saleCount)
      .slice(0, 5);
    console.log(topSale);

    const topSaleProduct = [];

    for (const pro of topSale) {
      pro.brand_info = await brandsModel.getOne(pro.brandId);
      topSaleProduct.push(pro);
    }

    indexTopSaleView.renderCards(topSaleProduct);

    document.dispatchEvent(new CustomEvent("controllerDone"));
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const init = async function () {
  await controlDiscounted();
  await controlTopSale();
};
init();