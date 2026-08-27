import { API } from "../../config";
import Model from "../model";

class ProductsModel extends Model {
  url = `${API}/products`;
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
    console.log('mmd');
    return await this.fetch(this.url + `?categoryId=${cat_id}`);
  }

  async getByFeild(field) {
    return await this.fetch(this.url + `?_sort=-${field}`);
  }
}
export default new ProductsModel();
