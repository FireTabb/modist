import { API } from "../../config";
import Model from "../model";

class BrandsModel extends Model {
  url = `${API}/brands`;
  async getOne(id) {
    return await this.fetch(this.url + `/${id}`);
  }
}
export default new BrandsModel();
