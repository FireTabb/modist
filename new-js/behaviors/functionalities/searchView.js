export class search {
  searchHandler() {
    const openSearchbtn = document.querySelector(".search__fake");
    const returnBtns = document.querySelectorAll(".return__icon--header");
    const searchSection = document.querySelector(".search__wraper");
    const searchInput = document.querySelector(".search__input");

    // export const openSearchHandler = function () {};

    // export const returnSearchHandler = function () {};

    openSearchbtn.addEventListener("click", function (e) {
      searchSection.classList.toggle("hidden");
      searchInput.focus();
      document.body.classList.add("no-scroll");
    });
    returnBtns.forEach((btn) =>
      btn.addEventListener("click", function () {
        searchSection.classList.toggle("hidden");
        document.body.classList.remove("no-scroll");
      }),
    );
  }
}

export default new search();
