import { API } from "../../config";
import Model from "../model";
import { AppError } from "../../behaviors/errorHandling/AppError";

class UsersModel extends Model {
  url = `${API}/users`;
  currentUser = null;

  constructor() {
    super();
    this._loadUserFromStorage();
  }

  // always run in the start
  _loadUserFromStorage() {
    const storedUser = localStorage.getItem("loggedInUser");
    try {
      if (storedUser) this.currentUser = JSON.parse(storedUser);
    } catch {
      this.currentUser = null;
    }
    // localStorage.removeItem("loggedInUser");
    console.log(this.currentUser);
  }

  // get 1️⃣ user
  async getOne(id) {
    const data = await this.fetch(this.url + `/${id}`);
    if (!data || Object.keys(data).length === 0) {
      throw new AppError("USER_NOT_FOUND", "کاربر یافت نشد", 404);
    }
    return data;
  }

  // get user by the 📞 number
  async getByPhone(phone) {
    // in phone=n the n is for a json server bug that we should use to be able to search stringed numbers in the database
    const [user] = await this.fetch(this.url + `?phone=n${+phone}`);
    if (!user) return null;
    return await user;
  }

  // get user by username
  async getByUsername(username, password) {
    const [user] = await this.fetch(this.url + `?username=${username}`);

    if (!user) throw new AppError("USER_NOT_FOUND", "کاربر یافت نشد", 404);

    if (user.password !== `p${password}`)
      throw new AppError("INVALID_CREDENTIALS", "رمز عبور اشتباه است", 401);

    return user;
  }

  // login a user
  async login(user) {
    try {
      const { id, username, phone } = user;
      const storingUser = { id, username, phone };

      localStorage.setItem("loggedInUser", JSON.stringify(storingUser));
      this.currentUser = storingUser;
      // return storingUser;
    } catch (err) {
      throw new AppError("STORAGE_ERROR", "خطا در ذخیره اطلاعات کاربر");
    }
  }

  // get current uesr
  async getCurrentUser() {
    if (!this.currentUser)
      throw new AppError("USER_NOT_FOUND", "کاربر یافت نشد", 404);
    return this.currentUser;
  }

  // check of there is a loged in user
  async isLoggedIn() {
    return this.currentUser !== null;
  }

  // log out the user
  async logout() {
    try {
      localStorage.removeItem("loggedInUser");
    } catch (err) {
      console.error("Logout Error:", err);
    } finally {
      this.currentUser = null;
    }
  }

  async signUp(username, password, phone){

  }
}
export default new UsersModel();
