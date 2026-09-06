import usersModel from "../../models/users/usersModel";
import welcomeView from "../../views/users/welcomeView";

const userCheck = async function (phoneNumber) {
  try {
    const userId = await usersModel.getCurrentUser();
    const user = await usersModel.getOne(userId);
    
    welcomeView.render(user.username);
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
