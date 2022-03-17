import Swiper from 'swiper';
import './common';
import { watchResizeBreakpoint } from './utils'

const initCarousel = () => {
  const id = '.carousel';
  return new Swiper(
    id,
    {
      effect: "fade",
      autoHeight: true,
      pagination: {
        el: `${id} .swiper-pagination`,
        clickable: true,
      },
      breakpoints: {
        1023: {
          slidesPerView: 4,
          allowTouchMove: false,
          enabled: false,
          autoHeight: false,
        },
      },
    }
  );
};

const initGetStartedCarousel = () => {
  const id = '#get-started-carousel';
  return new Swiper(
    id,
    {
      slidesPerView: 'auto',
      spaceBetween: 16,
      pagination: {
        el: `${id} .swiper-pagination`,
        clickable: true,
      },
      breakpoints: {
        1023: {
          slidesPerView: 4,
          allowTouchMove: false,
          enabled: false,
        },
      },
    }
  );
}

window.addEventListener("load", () => {
  if (document.querySelector('.page-alpaca-linux')) {
    const carousel = initCarousel();
    initGetStartedCarousel();
    watchResizeBreakpoint(
      '(min-width: 1024px)',
      () => location.reload(),
      () => location.reload(),
    );

    watchResizeBreakpoint(
      '(min-width: 375px)',
      () => carousel.update(),
      () => carousel.update(),
    );
  }
});