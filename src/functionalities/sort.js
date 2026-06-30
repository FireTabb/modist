const filterAndSortWraper = document.querySelector(".filter-and-sort__wraper");
const bluredLable = document.querySelector("#blur-lable");

const sortWindow = document.querySelector("#sort-wraper");
const sortDrag = document.querySelector("#sort__drag-handler");

// filter and sortby wraper
filterAndSortWraper?.addEventListener("click", function (e) {
  const sortBtn = e.target.closest("#sort__btn");
  // const filterBtn = e.target.closest("#filter__btn");

  if (!sortBtn) return;

  if (sortBtn) {
    sortWindow.style.transform = `translateY(0)`;
    bluredLable.classList.remove("hidden");
  }

  document.body.classList.add("no-scroll");
});

bluredLable?.addEventListener("click", function () {
  sortWindow.style.transform = `translateY(100%)`;
  bluredLable.classList.add("hidden");
  document.body.classList.remove("no-scroll");
});

// drag to dismiss
let startY = 0;
let currentY = 0;

sortDrag?.addEventListener("touchstart", function (e) {
  startY = e.touches[0].clientY;
});

sortDrag?.addEventListener("touchmove", function (e) {
  sortWindow.classList.remove("translate-y-full");
  sortWindow.classList.remove("transition-primary");

  currentY = e.touches[0].clientY - startY;
  if (currentY < 0) return;

  sortWindow.style.transform = `translateY(${currentY}px)`;
});

sortDrag?.addEventListener("touchend", () => {
  sortWindow.classList.add("transition-primary");

  if (currentY < 150) {
    sortWindow.style.transform = `translateY(0)`;
  } else {
    sortWindow.style.transform = `translateY(100%)`;
    bluredLable.classList.add("hidden");
    document.body.classList.remove("no-scroll");
  }
  currentY = 0;
});