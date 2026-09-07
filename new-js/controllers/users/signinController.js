import signinView from "../../views/users/signinView";
import usersModel from "../../models/users/usersModel";

const userCheck = async function (username, password) {
  // base on the entered phone number in the View we render all signup operation
  try {

  } catch (err) {
    console.log(err);
    throw err;
  }
};

const init = async function () {
  try {
    await signinView.signinHandlers();
  } catch (err) {
    console.log(err);
    throw err;
  }
};
init();
