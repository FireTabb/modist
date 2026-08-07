import { API_PRODUCT_URL, API_CATEGORIES_URL, API_BRANDS_URL } from "./config";
import { AJAX } from "./helper";

export const state = {
  product: {},
  products: [],
  mainCategories: [],
  subCategories: [],
  brands: [],
};

const creatProductObj = function (data) {
  return {
    id: data.id,
    code: data.code,
    title: data.title,
    slug: data.slug,
    categoryId: data.categoryId,
    brandId: data.brandId,
    price: data.price,
    discount: data.discount,
    discountedPrice: data.discount
      ? (data.price * (100 - data.discount)) / 100
      : undefined,
    rating: data.rating,
    salesCount: data.salesCount,
    stock: data.stock,
    thumbnail: data.thumbnail,
    gallery: data.gallery,
    colors: data.colors,
    sizes: data.sizes,
    description: data.description,
    specifications: data.specifications,
  };
};

const setCategoryAndBrand = function (category, branId,def_state=state) {
  const subCat = (def_state|| state).subCategories.find((cat) => +cat.id === category);
  const mainCat = (def_state|| state).mainCategories.find(
    (cat) => +cat.id === subCat.parentId,
  );
  const brandObj = (def_state||state).brands.find((bra) => +bra.id === branId);

  // console.log(def_state);

  state.product.subCategory = subCat.name;
  state.product.mainCategory = mainCat.name;
  // state.product.brand = brandObj.name;
  return state
};

export const loadProduct = async function (id) {
  try {
    const data = await AJAX(API_PRODUCT_URL);
    const product = data.find((products) => +products.id === id);
    state.product = creatProductObj(product);
    
    const res= setCategoryAndBrand(state.product.categoryId, state.product.brandId,state);
console.log(state);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const loadCategoryAndBrand = async function () {
  try {
    const categoryData = await AJAX(API_CATEGORIES_URL);
    categoryData.forEach((category) =>
      !category.parentId
        ? state.mainCategories.push(category)
        : state.subCategories.push(category),
    );
// console.log(this);
    const brandData = await AJAX(API_BRANDS_URL);
    state.brands.push(...brandData)
    // console.log(state.brands);
    // brandData.forEach((brand) => state.brands.push(brand));
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const loadDiscountProducts = async function () {
  const data = await AJAX(API_PRODUCT_URL);
  state.products.length = 0;

  const discountProducts = data.filter((product) => product.discount > 20);

  discountProducts.sort((a, b) => a.discount - b.discount);

  discountProducts.forEach((pro) => state.products.push(pro));
};

export const loadTopSaleProducts = async function () {
  const data = await AJAX(API_PRODUCT_URL);
  state.products.length = 0;

  data.sort((a, b) => b.salesCount - a.salesCount);

  const topSaleProducts = data.slice(0, 5).reverse();

  topSaleProducts.forEach((pro) => state.products.push(pro));
};
