import signupView from "../../views/users/signupView";
import usersModel from "../../models/users/usersModel";

const userCheck = async function (phoneNumber) {
  // base on the entered phone number in the View we render all signup operation
  try {
    // renderring seconds counter and phone preview
    await signupView.phonePrevieRender(phoneNumber);
    await signupView.resendTimerHandler(120);
    await signupView.resetCodeTimerHandler();

    // if user exist we just sign
    const user = await usersModel.getByPhone(phoneNumber);
    if (user) {
      await signupView.codeInputHandler(user);
      await usersModel.login(user);
      const currUser = await usersModel.getCurrentUser();
      return;
    }
    //  if user dont exist we go to the signup form
    else {
      await signupView.codeInputHandler();
      await signupView.signupHandlers();
    }
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
