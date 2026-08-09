import { AJAX } from "../helper";

export default class Model {
  fetch = null;
  constructor() {
    this.fetch = AJAX;
  }

  async get(url) {
    return await this.fetch(url);
  }

  async creatProductObj(data) {
    return await {
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
  }
}