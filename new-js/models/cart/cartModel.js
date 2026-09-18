import Model from "../model";
import { API } from "../../config";
import { AppError } from "../../behaviors/errorHandling/AppError";
import { ERROR_CODES } from "../../config";
import getProductsData from "../../controllers/controllerFunctionalities/productsObj";

class CartModel extends Model {
  url = `${API}/users`;
  _cartKey = "gusstCart";

  constructor() {
    super();
    // this._clearCart();
  }

  _clearCart() {
    try {
      localStorage.removeItem(this._cartKey);
    } catch (err) {
      console.error(err);
      throw new AppError(ERROR_CODES.STORAGE_ERROR);
    }
  }

  getCart() {
    try {
      const cart = localStorage.getItem(this._cartKey);
      return cart ? JSON.parse(cart) : [];
    } catch (err) {
      console.error(err);
      throw new AppError(ERROR_CODES.STORAGE_ERROR);
    }
  }

  _saveGusstCart(cart) {
    try {
      localStorage.setItem(this._cartKey, JSON.stringify(cart));
    } catch (err) {
      console.error(err);
      throw new AppError(ERROR_CODES.STORAGE_ERROR);
    }
  }

  _getProductInCart(productId) {
    const cart = this.getCart();

    return cart.find((item) => +item.id === productId);
  }

  clearProduct(productId) {
    const cart = this.getCart();
    const product = this._getProductInCart(productId);

    const index = cart.findIndex(
      (cartProduct) => cartProduct.id === product.id,
    );

    cart.splice(index, 1);

    this._saveGusstCart(cart);
  }

  addGusstProduct(productId) {
    try {
      if (!productId) {
        throw new AppError(ERROR_CODES.INVALID_PRODUCT_ID);
      }
      const cart = this.getCart();

      const product = cart.find((item) => +item.id === productId);
      if (!product) {
        cart.push({ id: productId, quantity: 1 });
      }

      if (product) {
        product.quantity++;
      }
      this._saveGusstCart(cart);
      return product?.quantity ? product.quantity : 0;
    } catch (err) {
      console.error(err);
      if (err instanceof AppError) throw err;
      throw new AppError(ERROR_CODES.STORAGE_ERROR);
    }
  }

  removeGusstProduct(productId) {
    try {
      if (!productId) {
        throw new AppError(ERROR_CODES.INVALID_PRODUCT_ID);
      }
      const cart = this.getCart();
      const product = cart.find((item) => +item.id === productId);

      if (product) {
        product.quantity--;
      }

      if (product.quantity === 0) {
        const index = cart.indexOf(product);

        cart.splice(index, 1);
      }

      this._saveGusstCart(cart);
      return product?.quantity ? product.quantity : 0;
    } catch (err) {
      if (err instanceof AppError) throw err;
      throw new AppError(ERROR_CODES.STORAGE_ERROR);
    }
  }

  getProductsQuantity(productId) {
    try {
      if (!productId) {
        throw new AppError(ERROR_CODES.INVALID_PRODUCT_ID);
      }
      const cart = this.getCart();
      const product = this._getProductInCart(productId);
      return product?.quantity ? product.quantity : 0;
    } catch (err) {
      if (err instanceof AppError) throw err;
      throw new AppError(ERROR_CODES.STORAGE_ERROR);
    }
  }
}

export default new CartModel();
