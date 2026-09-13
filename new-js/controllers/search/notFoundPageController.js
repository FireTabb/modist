import titleView from "../../views/titleView.js";

const notFoundPageController = async function () {
  try {
    await titleView.returnBtnHandler(1);
  } catch (err) {
    console.error(err);
  }
};

await notFoundPageController();
