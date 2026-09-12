// import productsModel from "../../models/products/productsModel";
import brandsModel from "../../models/brands/brandsModel";
import formatProduct from "./formatProduct";

const brandSetter = async function (products) {
  try {
    if (Array.isArray(products)) {
      const brandedProducts = [];
      for (const pro of products) {
        pro.brand_info = await brandsModel.getOne(pro.brandId);
        brandedProducts.push(pro);
      }
      return brandedProducts;
    } else {
      products.brand_info = await brandsModel.getOne(products.brandId);
      return products;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getProductsData = async function (products, { brand = true } = {}) {
  try {
    let productsData;

    Array.isArray(products)
      ? (productsData = products.map(formatProduct))
      : (productsData = formatProduct(products));

    if (brand) {
      productsData = brandSetter(productsData);
    }

    return productsData;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default getProductsData;
