import usersModel from "../../models/users/usersModel";

const loginCheck = (async function () {
  const logedin = await usersModel.isLoggedIn();
  logedin
    ? window.location.replace("profile.html")
    : (document.body.classList.remove("hidden"));
})();
