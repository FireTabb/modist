import usersModel from "../../models/users/usersModel";
import profileView from "../../views/users/profileView";
const exitController = async function () {
  usersModel.logout();
  window.location.replace("profile-signup.html");
};

const usernameController = async function () {
  try {
    const currentUser = await usersModel.getCurrentUser();
    console.log(currentUser);

    profileView.render(currentUser);
  } catch (err) {
    console.log(err);
    profileView.renderMessage("error", getErrorMessage(err));
  }
};

const init = async function () {
  usernameController();
  profileView.exitBtnHandler(exitController);
};
init();
