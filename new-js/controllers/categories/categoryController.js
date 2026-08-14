import productsModel from "../../models/products/productsModel.js";
import brandsModel from "../../../new-js/models/brands/brandsModel.js";
import categoryWonderfulDiscountView from "../../views/categories/categoryWonderfulDiscountView.js";

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

    categoryWonderfulDiscountView.renderCards(discountedProduct);

    document.dispatchEvent(new CustomEvent("controllerDone"));
  } catch (err) {
    console.error(err);
    throw err;
  }
};
controlDiscounted();