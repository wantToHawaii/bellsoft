import Swiper from "swiper";
import { watchResizeBreakpoint } from './utils';

window.addEventListener("load", () => {
  const partnersCapabilitiesCarousel = () => {
    const id = '#partners-capabilities-carousel';
    return new Swiper(
      id,
      {
        effect: "fade",
        pagination: {
          el: `${id} .swiper-pagination`,
          clickable: true,
        },
        loop: true,
        breakpoints: {
          768: {
            slidesPerView: 3,
            effect: "slide",
            direction: "horizontal",
            loop: false,
          },
        },
      }
    );
  };

  const partnersCarousel = () => {
    const id = '#partners-carousel';
    return new Swiper(
      id,
      {
        effect: "fade",
        loop: true,
        autoHeight: true,
        pagination: {
          el: `${id} .swiper-pagination`,
          clickable: true,
        },
        navigation: {
          nextEl: `${id} .swiper-button-next`,
          prevEl: `${id} .swiper-button-prev`,
        },
        breakpoints: {
          768: {
            loop: false,
          },
        },
      }
    );
  };

  const partnerDescriptionCarousel = () => {
    const id = '#partner-description-carousel';
    return new Swiper(
      id,
      {
        effect: "fade",
        pagination: {
          el: `${id} .swiper-pagination`,
          clickable: true,
        },
        loop: true,
        autoHeight: true,
        breakpoints: {
          1024: {
            slidesPerView: 3,
            effect: "slide",
            direction: "horizontal",
            loop: false,
            autoHeight: false,
          },
        },
      }
    );
  };

  const callbackPopup = () => {
    const body = document.querySelector('body');
    const popup = document.querySelector('#partners-callback-popup');

    const showPopup = () => {
      if (!popup.classList.contains('active')) {
        body.style.setProperty('overflow', 'hidden');
        popup.classList.add('active');
      }
    };

    const closePopup = () => {
      if (popup.classList.contains('active')) {
        body.style.removeProperty('overflow');
        popup.classList.remove('active');
      }
    };

    body.addEventListener('click', (e) => {
      const dataset = e.target.dataset;
      if (dataset.action === 'show-callback-popup') {
        showPopup();
      } else if (dataset.action === 'close-callback-popup') {
        closePopup();
      }
    });
  };

  if (document.querySelector('.page-partners-ru')) {
    partnersCapabilitiesCarousel();
    partnersCarousel();
    partnerDescriptionCarousel();
    // update carousels to correctly apply settings in breakpoints, swiper.methods don't update correctly
    watchResizeBreakpoint(
      '(min-width: 768px)',
      () => location.reload(),
      () => location.reload(),
    );
    watchResizeBreakpoint(
      '(min-width: 1024px)',
      () => location.reload(),
      () => location.reload(),
    );

    callbackPopup();
  }
});
