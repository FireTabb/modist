import { API } from "../../config";
import Model from "../model";
import productsModel from "../products/productsModel";

class CategoryModel extends Model {
  url = `${API}/categories`;
  async getOne(id) {
    const category = await this.fetch(this.url + `/${id}`);
    category.children = await this.fetch(this.url + `?parentId=${id}`);
    return category;
  }
  async getSubWithProducts(id) {
    let categories = await this.fetch(this.url + `?parentId=${id}`);
    return categories;
  }
  async getMains() {
    return await this.fetch(this.url + `?parentId=null`);
  }
}
export default new CategoryModel();
