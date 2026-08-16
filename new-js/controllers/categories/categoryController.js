import productsModel from "../../models/products/productsModel.js";
import brandsModel from "../../../new-js/models/brands/brandsModel.js";
import categoryModel from "../../models/category/categoryModel.js";

import categoryWonderfulDiscountView from "../../views/categories/categoryWonderfulDiscountView.js";
import categoryView from "../../views/categories/categoryView.js";

const brandSetter = async function (products) {
  const brandedProducts = [];
  for (const pro of products) {
    pro.brand_info = await brandsModel.getOne(pro.brandId);
    brandedProducts.push(pro);
  }
  return brandedProducts;
};

const controlDiscounted = async function () {
  try {
    const data = await productsModel.getAll();

    const discounted = await data
      .filter((data) => data.discount > 20)
      .sort((a, b) => b.discount - a.discount)
      .slice(0, 5);

    const discountedProduct = await brandSetter(discounted);

    categoryWonderfulDiscountView.renderCards(discountedProduct);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// ahhhhhhhhhhhhhhhhhh(need fix swipper bug)
// const controlCategory = async function () {
//   try {
//     const params = new URLSearchParams(window.location.search);
//     const mainCategoryId = Number(params.get("id"));

//     const products = await productsModel.getAll();
//     const brandedProducts = await brandSetter(products.slice(0, 4));
//     const mainCatWithSubCat = await categoryModel.getOne(mainCategoryId);

//     // render categories
//     await categoryView.renderCards(mainCatWithSubCat.children);

//     // render inner products for each category
//     const categoryProductsMap = new Map();
//     mainCatWithSubCat.children.forEach((cat) =>
//       categoryProductsMap.set(+cat.id, []),
//     );

//     brandedProducts.forEach((pro) => {
//       const categoryID = pro.categoryId;
//       if (!categoryProductsMap.has(categoryID)) {
//         categoryProductsMap.set(categoryID, []);
//       }
//       categoryProductsMap.get(categoryID).push(pro);
//     });

//     for (const [key, value] of categoryProductsMap) {
//       if (!value) break;
//       await categoryView.renderCards(value, key);
//     }

//     document.dispatchEvent(new CustomEvent("controllerDone"));
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// };
// controlCategory();

const controlCategory = async function () {
  try {
    const params = new URLSearchParams(window.location.search);
    const mainCategoryId = Number(params.get("id"));

    const products = await productsModel.getAll();
    const brandedProducts = await brandSetter(products);
    const mainCatWithSubCat = await categoryModel.getOne(mainCategoryId);

    // creat a map for sorting products by the categoryId
    const categoryProductsMap = new Map();
    mainCatWithSubCat.children.forEach((cat) =>
      categoryProductsMap.set(+cat.id, []),
    );

    brandedProducts.forEach((pro) => {
      const categoryID = pro.categoryId;
      if (!categoryProductsMap.has(categoryID)) {
        categoryProductsMap.set(categoryID, []);
      }
      categoryProductsMap.get(categoryID).push(pro);
    });

    // render categories
    await categoryView.categoryRender(
      mainCatWithSubCat.children,
      categoryProductsMap,
    );
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const init = async function () {
  await controlDiscounted();
  await controlCategory();
  document.dispatchEvent(new CustomEvent("controllerDone"));
};
init();
