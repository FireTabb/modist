import { API } from "../../config";
import Model from "../model";
import { AppError } from "../../behaviors/errorHandling/appError";
import { ERROR_CODES, HTTP_STATUS } from "../../config";

class UsersModel extends Model {
  url = `${API}/users`;
  currentUser = null;
  _userKey = "loggedInUser";

  constructor() {
    super();
    this._loadUserFromStorage();
  }

  // always run in the start
  _loadUserFromStorage() {
    const storedUser = localStorage.getItem(this._userKey);
    try {
      if (storedUser) this.currentUser = JSON.parse(storedUser);
    } catch {
      this.currentUser = null;
    }
    // localStorage.removeItem(this._userKey);
    console.log(this.currentUser);
  }

  // get 1️⃣ user
  async getOne(id) {
    const data = await this.fetch(this.url + `/${id}`);
    if (!data || Object.keys(data).length === 0) {
      throw new AppError(ERROR_CODES.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }
    return data;
  }

  // get user by the 📞 number
  async getByPhone(phone) {
    // in phone=n the n is for a json server bug that we should use to be able to search stringed numbers in the database
    const [user] = await this.fetch(this.url + `?phone=n${+phone}`);
    if (!user) return null;
    return user;
  }

  // get user by username
  async getByUsername(username, password) {
    const [user] = await this.fetch(this.url + `?username=${username}`);

    if (!user)
      throw new AppError(ERROR_CODES.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);

    if (user.password !== `p${password}`)
      throw new AppError(
        ERROR_CODES.INVALID_CREDENTIALS,
        HTTP_STATUS.UNAUTHORIZED,
      );
    return user;
  }

  // login a user
  async login(user) {
    try {
      const { id, username, phone } = user;
      const storingUser = { id, username, phone };

      localStorage.setItem(this._userKey, JSON.stringify(storingUser));
      this.currentUser = storingUser;
      // return storingUser;
    } catch (err) {
      console.error(err);
      throw new AppError(ERROR_CODES.STORAGE_ERROR);
    }
  }

  // get current uesr
  async getCurrentUser() {
    if (!this.currentUser)
      throw new AppError(ERROR_CODES.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED);
    return this.currentUser;
  }

  // check of there is a loged in user
  isLoggedIn() {
    return this.currentUser !== null;
  }

  // log out the user
  async logout() {
    try {
      localStorage.removeItem(this._userKey);
    } catch (err) {
      console.error("Logout Error:", err);
      throw new AppError(ERROR_CODES.STORAGE_ERROR);
    } finally {
      this.currentUser = null;
    }
  }

  async signUp(username, password, phone) {
    const newUser = {
      phone: "n" + Number(phone),
      username: username,
      password: "p" + password,
    };

    await this.fetch(this.url, newUser);
  }
}
export default new UsersModel();
