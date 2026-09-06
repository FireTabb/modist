import { API } from "../../config";
import Model from "../model";

class UsersModel extends Model {
  url = `${API}/users`;

  //   async getAll() {
  //     return await this.fetch(this.url);
  //   }

  async getOne(id) {
    const data = await this.fetch(this.url + `/${id}`);
    // data.brand_info = await brandsModel.getOne(data.brandId);
    return data;

    // await productsModel.getOne(id);
    // data.category = await categoryModel.getOne(1);
  }

  async getByPhone(phone) {
    // in phone=p the p is for a json server bug that we should use to be able to search stringed numbers in the database
    const [user] = await this.fetch(this.url + `?phone=n${+phone}`);
    return await user;
  }

  async getByUsername(username, password) {
    console.log("the password is " + password);
    return await this.fetch(this.url + `?username=-${username}`);
  }

  async login(user) {
    localStorage.setItem("loggedInUser", user);
  }

  async getCurrentUser() {
    return localStorage.getItem("loggedInUser");
  }

  async logout() {
    localStorage.removeItem("loggedInUser");
  }
}
export default new UsersModel();
