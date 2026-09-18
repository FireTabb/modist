// submit handler
const allInputsSubmit = function (form, submitBtn) {
  console.log(form);
  console.log(submitBtn);
  checkValidities(form)
    ? submitBtn.removeAttribute("disabled")
    : submitBtn.setAttribute("disabled", "");
};
// submit function
function checkValidities(form) {
  let status = form?.checkValidity();
  
  const shouldCheckFormValidity = form.querySelector("[data-check-validity]");

  if (shouldCheckFormValidity) {
    status = form.checkValidity();
  }

  form.querySelectorAll("input, textarea").forEach((i) => {
    if (!i.disabled && i.getAttribute("required") === "") {
      if (!i.value) {
        status = false;
      }
      if (i.getAttribute("id") === "shopping-phone__input") {
        if (!i.value.startsWith("09") || i.value.length !== 11) {
          status = false;
        }
      }
    }
  });
  return status;
}

export default allInputsSubmit;


