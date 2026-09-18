import usersModel from "../../models/users/usersModel";
import welcomeView from "../../views/users/welcomeView";

const userCheck = async function (phoneNumber) {
  try {
    const user = await usersModel.getCurrentUser();
    if (user) {
      welcomeView.render(user.username);
      await welcomeView.renderMessage("success", "با موفقیت وارد شدید");
    }
  } catch (err) {
    console.log(err);
    welcomeView.renderMessage("error", getErrorMessage(err));
  }
};
userCheck();