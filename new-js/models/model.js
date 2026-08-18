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
      
      price: data.discount
        ? (data.price * (100 - data.discount)) / 100
        : data.price,
      discount: data.discount,
      beforeDiscountPrice: data.discount ? data.price : undefined,

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
