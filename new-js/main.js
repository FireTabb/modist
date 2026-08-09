// import changeTranslateX from "./functionalities/changeX.js";

// import "./functionalities/sort-and-filter.js";
// import "./functionalities/price-range.js";
// import "./functionalities/forms-submit-activate.js";
// import "./functionalities/search.js";
// import "./functionalities/showMessage.js";

import "./page-loader.js"


import "./controller-loader.js";

document.addEventListener("controllerDone", function () {
  import ("./slider.js");
});

document.addEventListener