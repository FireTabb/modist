import productsModel from "../../models/products/productsModel.js";
import productView from "../../views/product/productView.js";

import brandsModel from "../../../new-js/models/brands/brandsModel.js";
import categoryModel from "../../../new-js/models/category/categoryModel.js";

import productsObjCreator from "../controllerFunctionalities/productsObj.js";

// // submit handler
// const submitHandler = function (form, submitBtn) {
//   // console.log("formed");
//   submitBtn.disabled = !checkValidities(form);
// };
// // submit function
// function checkValidities(form) {
//   let status = form?.checkValidity();

//   const shouldCheckFormValidity = form.querySelector("[data-check-validity]");

//   if (shouldCheckFormValidity) {
//     status = form.checkValidity();
//   }

//   form.querySelectorAll("input, textarea").forEach((i) => {
//     if (!i.disabled && i.getAttribute("required") === "") {
//       if (!i.value) {
//         status = false;
//       }
//       if (i.getAttribute("id") === "shopping-phone__input") {
//         if (!i.value.startsWith("09") || i.value.length !== 11) {
//           status = false;
//         }
//       }
//     }
//   });
//   return status;
// }

const controlProduct = async function () {
  try {
    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));

    const data = await productsModel.getOne(id);
    const dataObj = await productsObjCreator(data);
    
    
    productView.render(dataObj);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const init = async function () {
  await controlProduct();
  productView.bindFormValidation();

  document.dispatchEvent(new CustomEvent("controllerDone"));
};
init();
