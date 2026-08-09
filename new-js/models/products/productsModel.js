import { API_PRODUCT_URL } from "../../config";
import Model from "../model";

class ProductsModel extends Model {
  url = API_PRODUCT_URL;
  async getAll() {
    return await this.fetch(this.url);
  }

  async getOne(id) {
    const data = await this.fetch(this.url + `/${id}`);
    // data.brand_info = await brandsModel.getOne(data.brandId);
    

    return data;

    // await productsModel.getOne(id);
    // data.category = await categoryModel.getOne(1);
  }

  async getByCategory(cat_id) {
    return await this.fetch(this.url + `?categoryId=${cat_id}`);
  }
}
export default new ProductsModel();