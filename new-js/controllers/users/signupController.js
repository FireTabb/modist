import signupView from "../../views/users/signupView";
import usersModel from "../../models/users/usersModel";

const userCheck = async function (phoneNumber) {
  const user = await usersModel.getByPhone(phoneNumber);
  if (user) await signupView.codeInputHandler(user);
  await signupView.codeInputHandler();
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
