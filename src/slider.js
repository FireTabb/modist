import Swiper from "swiper";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import 'swiper/css/thumbs';

new Swiper(".offer-slider", {
  speed: 500,
  modules: [Navigation, Pagination, Thumbs],
  centeredSlides: true,
  pagination: {
    el: ".swiper-pagination.offer",
  },
  navigation: {
    nextEl: ".swiper-button-next.offer",
    prevEl: ".swiper-button-prev.offer",
  },
  scrollbar: {
    el: ".swiper-scrollbar.offer",
  },
});
new Swiper(".best-seller-slider", {
  speed: 500,
  spaceBetween: 12,
  slidesPerView: 2.2,
});

const thumbsSwiper = new Swiper(".thumbs-swiper", {
  spaceBetween: 10,
  slidesPerView: 4,
  watchSlidesProgress: true,
});

const mainSwiper = new Swiper(".main-swiper", {
  modules: [Thumbs],
  spaceBetween: 10,
  thumbs: {
    swiper: thumbsSwiper,
  },
});
