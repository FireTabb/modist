const openSearchbtn = document.querySelector(".search__fake");
const returnBtns = document.querySelectorAll(".return__icon--header");
const searchSection = document.querySelector(".search__wraper");
const searchInput = document.querySelector(".search__input");

if (openSearchbtn) {
  openSearchbtn.addEventListener("click", function (e) {
    searchSection.classList.toggle("hidden");
    searchInput.focus();
    document.body.classList.add("no-scroll");
  });
}

if (returnBtns) {
  returnBtns.forEach((btn) =>
    btn.addEventListener("click", function () {
      searchSection.classList.toggle("hidden");
      document.body.classList.remove("no-scroll");
    }),
  );
}
