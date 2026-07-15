const sendInfoSubmit = document.querySelector("#send-info__submit");
const form = document.querySelector(".all-required-form");

// submit handler
function submitHandler(form) {
  // console.log("formed");

  checkValidities(form)
    ? sendInfoSubmit.removeAttribute("disabled")
    : sendInfoSubmit.setAttribute("disabled", "");
}
// submit function
function checkValidities(form) {
  let status = true;
  form.querySelectorAll("input, textarea").forEach((i) => {
    if (
      (i.getAttribute("name") === "paper-radio" ||
        i.getAttribute("name") === "send") &&
      i.getAttribute("type") === "radio" &&
      i.getAttribute("disabled") !== ""
    ) {
      status = form?.checkValidity();
    }

    if (
      i.getAttribute("disabled") !== "" &&
      i.getAttribute("required") === ""
    ) {
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

export default submitHandler;
