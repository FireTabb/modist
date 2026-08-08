import { API_PRODUCT_URL } from "../../../src/js/config";
import Model from "../model";

class ProductsModel extends Model{
    url=API_PRODUCT_URL
    async getAll(){
        return await this.fetch(this.url)
    }
    async getOne(id){
        return await this.fetch(this.url+`/${id}`)
    }
    async getByCategory(cat_id){
        return await this.fetch(this.url+`?categoryId=${cat_id}`)
    }
}
export default new ProductsModel()