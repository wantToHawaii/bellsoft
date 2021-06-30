import Swiper from "swiper";

window.addEventListener("load", () => {
  const partnersCapabilitiesCarousel = () => {
    const slider = new Swiper(
      "#partners-capabilities-carousel",
      {
        effect: "fade",
        pagination: {
          el: "#partners-capabilities-carousel .swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          768: {
            slidesPerView: 3,
            effect: "slide",
            direction: "horizontal",
          },
        },
      }
    );
  };

  const partnersCarousel = () => {
    const id = '#partners-carousel';
    const slider = new Swiper(
      id,
      {
        effect: "fade",
        autoHeight: true,
        pagination: {
          el: `${id} .swiper-pagination`,
          clickable: true,
        },
        navigation: {
          nextEl: `${id} .swiper-button-next`,
          prevEl: `${id} .swiper-button-prev`,
        },
      }
    );
  };

  const partnerDescriptionCarousel = () => {
    const id = '#partner-description-carousel';
    const slider = new Swiper(
      id,
      {
        effect: "fade",
        pagination: {
          el: `${id} .swiper-pagination`,
          clickable: true,
        },
        breakpoints: {
          1024: {
            slidesPerView: 3,
            effect: "slide",
            direction: "horizontal",
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

  partnersCapabilitiesCarousel();
  partnersCarousel();
  partnerDescriptionCarousel();
  callbackPopup();
});
