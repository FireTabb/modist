import { API_BRANDS_URL, API_CATEGORIES_URL } from "../../../src/js/config";
import Model from "../model";

class BrandsModel extends Model{
    url=API_CATEGORIES_URL
    async getOne(id){
        return await this.fetch(this.url+`/${id}`)
    }
}
export default new BrandsModel()