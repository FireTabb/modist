import shoppingCartView from "../../views/shoppingCart/shoppingCartView";
import cartModel from "../../models/cart/cartModel";
import productsModel from "../../models/products/productsModel";
import getProductsData from "../controllerFunctionalities/productsObj";
import formatProduct from "../controllerFunctionalities/formatProduct";
import titleView from "../../views/titleView";

const cartCheck = function () {
  try {
    const cart = cartModel.getCart();
    if (Array.isArray(cart) && cart.length === 0) {
      window.location.assign("empty-cart-page.html");
    }
  } catch (err) {
    console.error(err);
    shoppingCartView.renderMessage("error", getErrorMessage(err));
  }
};

const receipt = {
  total: 0,
  productsDiscount: 0,
  codeDiscount: null,
  payable: 0,
};

const receiptUpdate = function (state, product = null) {
  try {
    const originalPrice = product.discount
      ? product.beforeDiscountPrice
      : product.price;

    const quantity =
      state === "initial" || state === "clear" ? product.quantity : 1;

    const multiplier = state === "remove" || state === "clear" ? -1 : 1;

    receipt.total += originalPrice * quantity * multiplier;
    receipt.payable += product.price * quantity * multiplier;

    receipt.productsDiscount = receipt.total - receipt.payable;
    return receipt;
  } catch (err) {
    console.error(err);
    shoppingCartView.renderMessage("error", getErrorMessage(err));
  }
};

const controlRenderCart = async function () {
  try {
    const productsCartBasicInfo = cartModel.getCart();

    const productArr = await Promise.all(
      productsCartBasicInfo.map(async (baseProInfo) => {
        const product = await productsModel.getOne(baseProInfo.id);
        const productObj = await getProductsData(product);
        productObj.quantity = baseProInfo.quantity;
        return productObj;
      }),
    );

    productArr.forEach((product) => {
      receiptUpdate("initial", product);
    });

    shoppingCartView.receiptRender(receipt);
    shoppingCartView.renderCards(productArr);
  } catch (err) {
    console.error(err);
    shoppingCartView.renderMessage("error", getErrorMessage(err));
  }
};

const controlCartProductAddHandler = async function (id) {
  try {
    const quantity = cartModel.addGusstProduct(+id);

    const product = await productsModel.getOne(+id);
    const formatedProduct = formatProduct(product);
    receiptUpdate("add", formatedProduct);

    shoppingCartView.receiptRender(receipt);
    return quantity;
  } catch (err) {
    console.error(err);
    shoppingCartView.renderMessage("error", getErrorMessage(err));
  }
};

const controlCartProductRemoveHandler = async function (id, clear = false) {
  try {
    const product = await productsModel.getOne(+id);
    const formatedProduct = formatProduct(product);

    if (clear) {
      const quantity = await cartModel.getProductsQuantity(+id);
      formatedProduct.quantity = quantity;
      receiptUpdate("clear", formatedProduct);
      shoppingCartView.receiptRender(receipt);
      cartModel.clearProduct(+id);
      cartCheck();
      return;
    }

    if (!clear) {
      cartModel.removeGusstProduct(+id);
      const quantity = await cartModel.getProductsQuantity(+id);

      receiptUpdate("remove", formatedProduct);
      shoppingCartView.receiptRender(receipt);
      cartCheck();
      return quantity;
    }
  } catch (err) {
    console.error(err);
    shoppingCartView.renderMessage("error", getErrorMessage(err));
  }
};

const init = async function () {
  await cartCheck();
  await controlRenderCart();
  shoppingCartView.addProductsBtns(
    controlCartProductAddHandler,
    controlCartProductRemoveHandler,
  );
  titleView.returnBtnHandler();
};
init();
