import usersModel from "../../models/users/usersModel";
import signinView from "../../views/users/signinView";
import {
  messages,
  getErrorMessage,
} from "../../behaviors/errorHandling/message";

const userPassCheck = async function (username, password) {
  // base on the entered phone number in the View we render all signup operation
  try {
    const user = await usersModel.getByUsername(username, password);

    await usersModel.login(user);
    await signinView.renderMessage("success", messages.success.LOGIN_SUCCESS);
    await window.location.assign(`welcome-page.html`);

    // await signinView.renderMessage(
    //   "error",
    //   "نام کاربری یا رمز عبور اشتباه است",
    // );
    // await signinView.showLoginResult();
  } catch (err) {
    console.error("[Login Error]", err);
    signinView.renderMessage("error", getErrorMessage(err));
  }
};

const init = async function () {
  try {
    await signinView.signinHandlers();
    await signinView.getUsernameAndPasswordHandler(userPassCheck);
  } catch (err) {
    console.log(err);
    throw err;
  }
};
init();
