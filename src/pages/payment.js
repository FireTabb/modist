import submitHandler from "./../functionalities/form-activate-with-all-inputs.js";

const paymentForm = document.querySelector("#payment-form");
const paymentSubmit = document.querySelector("#payment__submit");

const paymentCardToCardInput = document.querySelector("#payment-cardtocard");

paymentForm?.addEventListener("click", function (e) {
  const inputRadio = e.target.closest(".payment-method__lable");

  console.log(inputRadio);
  console.log(inputRadio.id);

  if (!inputRadio) return;
  console.log("mmd");

  if (inputRadio.id === "payment-cardtocard") {
    paymentSubmit.innerHTML = "ثبت اطلاعات واریزی";
  } else {
    paymentSubmit.innerHTML = `
    <span>ادامه خرید</span>
    <i class="iconsax t-2-bold text-white" icon-name="arrow-left"></i>`;
  }

  if (inputRadio.id === "payment-gateway") {
    console.log("mmd");

    document
      .querySelectorAll(".gateway-radio")
      .forEach((gatewatRadio) => gatewatRadio.removeAttribute("disabled"));
  } else {
    console.log("mmd");
    document
      .querySelectorAll(".gateway-radio")
      .forEach((gatewatRadio) => gatewatRadio.setAttribute("disabled", ""));
  }
});
