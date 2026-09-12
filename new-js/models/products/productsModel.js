import { API } from "../../config";
import Model from "../model";

class ProductsModel extends Model {
  url = `${API}/products`;
  async getAll() {
    return await this.fetch(this.url);
  }

  async getOne(id) {
    const data = await this.fetch(this.url + `/${id}`);
    return data;
  }

  async getByCategory(cat_id) {
    return this.fetch(this.url + `?categoryId=${cat_id}`);
  }

  async getByField(field) {
    return this.fetch(this.url + `?_sort=-${field}`);
  }
}
export default new ProductsModel();
