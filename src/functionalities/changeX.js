const changeTranslateX = function (wrapers, pageNum = 1) {
  wrapers.forEach((wraper, index) => {
    wraper.style.transform = `translateX(${(pageNum - (index + 1)) * 100}%)`;
  });
};

export default changeTranslateX;