const container = document.querySelector("#toast-container");

const showMessage = function (type = "condition", message = "وضعیت نامشخص") {
  let bg;
  switch (type) {
    case "success":
      bg = "bg-success-700";
      break;

    case "error":
      bg = "bg-error-700";
      break;

    default:
      type = "condition";
      bg = "bg-primary-700";
      break;
  }

  const toast = document.createElement("div");
  toast.className = `${bg} translate-x-[-110%] z-[100] text-primary-50 p-2-regular transition-primary flex justify-between rounded-sm p-5 text-nowrap`;
  toast.innerHTML = `<p>${message}</p> <button class="text-secondary p-2-bold ${type === "condition" ? "" : "hidden"}">متوجه شدم</button>`;
  container.prepend(toast);

  setTimeout(() => {
    toast.classList.remove("translate-x-[-110%]");
    toast.classList.add("translate-x-[0]");
  }, 100);

  if (type !== "condition") {
    setTimeout(() => {
      toast.classList.remove("translate-x-[0]");
      toast.classList.add("translate-x-[110%]");
    }, 4000);
    setTimeout(() => {
      container.removeChild(toast);
    }, 5000);
  }

  if (type === "condition") {
toast.querySelector("button")
.addEventListener("click", function () {
      toast.classList.remove("translate-x-[0]");
      toast.classList.add("translate-x-[110%]");
      setTimeout(() => {
        container.removeChild(toast);
      }, 1000);
    });
  }
};

// showMessage("success", "موفق");
// setTimeout(() => {
//   showMessage("error", "نا موفق");
// }, 500);
// setTimeout(() => {
//   showMessage("", "معمولی");
// }, 1000);


export default showMessage;
