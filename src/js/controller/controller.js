import * as model from "../model.js";

import submitHandler from "../../functionalities/form-activate-with-all-inputs.js";

const init = async function () {
    await model.loadCategoryAndBrand();

};
init();

export { model, submitHandler };
