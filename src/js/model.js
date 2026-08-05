import { API_URL } from "./config";
import { AJAX } from "./helper";

export const state = {
  product: {},
  products: [],
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

export const loadProduct = async function (id) {
  try {
    const data = await AJAX(API_URL);
    const product = data.find((products) => +products.id === id);

    state.product = creatProductObj(product);
    
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const loadDiscountProducts = async function () {
  const data = await AJAX(API_URL);
  state.products.length = 0;

  const discountProducts = data.filter((product) => product.discount > 0);
  for (let i = 0; i < 3; i++) {
    state.products.push(discountProducts[i]);
  }
};
