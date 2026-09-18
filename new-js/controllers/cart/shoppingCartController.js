import shoppingCartView from "../../views/shoppingCart/shoppingCartView";
import cartModel from "../../models/cart/cartModel";
import productsModel from "../../models/products/productsModel";
import getProductsData from "../controllerFunctionalities/productsObj";

const controlCartProductAddHandler = async function (id) {
  try {
    cartModel.addGusstProduct(+id);

    const quantity = await cartModel.getProductsQuantity(+id);

    return quantity;
  } catch (err) {
    console.error(err);
    productView.renderMessage("error", getErrorMessage(err));
  }
};

const controlCartProductRemoveHandler = async function (id, clear = false) {
  try {
    if(clear){
      cartModel.clearProduct(+id)
      return
    }
    cartModel.removeGusstProduct(+id);
    const quantity = await cartModel.getProductsQuantity(+id);

    return quantity;
  } catch (err) {
    console.error(err);
    productView.renderMessage("error", getErrorMessage(err));
  }
};

const controlSendInfo = async function () {
  const productsCartBasicInfo = cartModel.getCart();
  console.log(productsCartBasicInfo);

  const productArr = [];
  for (const baseProInfo of productsCartBasicInfo) {
    const product = await productsModel.getOne(baseProInfo.id);
    const productObj = await getProductsData(product);
    productObj.quantity = baseProInfo.quantity;
    productArr.push(productObj);
  }
  shoppingCartView.renderCards(productArr);

  // // add handlers to btns
  // for (const pro of productArr) {
  //   shoppingCartView.addProductsBtns(
  //     controlCartProductAddHandler,
  //     controlCartProductRemoveHandler,
  //     pro,
  //   );
  // }
};

const init = async function () {
  await controlSendInfo();
  shoppingCartView.addProductsBtns(
    controlCartProductAddHandler,
    controlCartProductRemoveHandler,
  );
  // await titleView.returnBtnHandler();
  // await controlProduct();
  // productView.bindFormValidation();
};
init();
