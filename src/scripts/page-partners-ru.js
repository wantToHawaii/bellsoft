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

  partnersCapabilitiesCarousel();
  partnersCarousel();
});
