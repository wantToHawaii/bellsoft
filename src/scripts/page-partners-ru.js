import Swiper from "swiper";

window.addEventListener("load", () => {
  const partnersCapabilitiesCarousel = () => {
    const slider = new Swiper(
      "#partners-capabilities-carousel",
      {
        effect: "fade",
        // autoHeight: true,
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

  partnersCapabilitiesCarousel();
});
