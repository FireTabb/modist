import { API } from "../../config";
import Model from "../model";

class UsersModel extends Model {
  url = `${API}/users`;
  currentUser = null;

  constructor() {
    super();
    this._loadUserFromStorage();
  }

  _loadUserFromStorage() {
    const storedUser = localStorage.getItem("loggedInUser");
    
    try {
      if (storedUser) this.currentUser = JSON.parse(storedUser);
    } catch {
      this.currentUser = null;
    }
    console.log(this.currentUser);
    
  }

  async getOne(id) {
    const data = await this.fetch(this.url + `/${id}`);
    return data;
  }

  async getByPhone(phone) {
    // in phone=n the n is for a json server bug that we should use to be able to search stringed numbers in the database
    const [user] = await this.fetch(this.url + `?phone=n${+phone}`);
    return await user;
  }

  async getByUsername(username, password) {
    console.log("the password is " + password);
    return await this.fetch(this.url + `?username=-${username}`);
  }

  async login(userId) {
    const { id, username } = userId;
    const storingUser = { id, username };

    localStorage.setItem("loggedInUser", JSON.stringify(storingUser));
    this.currentUser = storingUser;
  }

  async getCurrentUser() {
    return this.currentUser;
  }

  async isLoggedIn() {
    return this.currentUser !== null;
  }

  async logout() {
    localStorage.removeItem("loggedInUser");
    this.currentUser = null;
  }
}
export default new UsersModel();
