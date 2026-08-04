export const state = {
  produc: {},
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
    const res = await fetch("http://localhost:3000/products");
    const data = (await res.json()).find((products) => +products.id === id);
    state.produc = creatProductObj(data);
  } catch (err) {
    console.log(err);
  }
};
