import signupView from "../../views/users/signupView";
import usersModel from "../../models/users/usersModel";

const userCheck = async function (phoneNumber) {
  try {
    if (phoneNumber) await signupView.phonePrevieRender(phoneNumber);
    const user = await usersModel.getByPhone(phoneNumber);
    if (user) {
      await signupView.codeInputHandler(user);
      await signupView.resendTimerHandler(120);
      await signupView.resetCodeTimerHandler();
      await usersModel.login(user.id);
      const currUser = await usersModel.getCurrentUser();
      return;
    }
    await signupView.codeInputHandler();
    await signupView.signupHandlers();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const init = async function () {
  try {
    await signupView.changeSignupPageHandler();
    await signupView.phonNumberCheckHandler();

    await signupView.getPhoneNumberHandler(userCheck);
  } catch (err) {
    console.log(err);
    throw err;
  }
};
init();
