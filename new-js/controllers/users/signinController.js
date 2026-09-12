import usersModel from "../../models/users/usersModel";
import signinView from "../../views/users/signinView";
import {
  messages,
  getErrorMessage,
} from "../../behaviors/errorHandling/uiMessages";

const userPassCheck = async function (username, password) {
  try {
    const user = await usersModel.getByUsername(username, password);

    await usersModel.login(user);
    await signinView.renderMessage("success", messages.success.LOGIN_SUCCESS);
    window.location.assign(`welcome-page.html`);
  } catch (err) {
    console.error("[Login Error]", err);
    signinView.renderMessage("error", getErrorMessage(err));
  }
};

const init = async function () {
  await signinView.signinHandlers();
  await signinView.getUsernameAndPasswordHandler(userPassCheck);
};
init();
