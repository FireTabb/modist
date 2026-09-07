import usersModel from "../../models/users/usersModel";
import welcomeView from "../../views/users/welcomeView";

const userCheck = async function (phoneNumber) {
  try {
    const user = await usersModel.getCurrentUser();
    if (user) {
      console.log(user);
      welcomeView.render(user.username);
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
userCheck();

// const init = async function () {
//   try {
//
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// };
// init();
