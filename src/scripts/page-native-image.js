import Swiper from "swiper";

window.addEventListener("load", () => {
  const initLibericaNativeImageSlider = () => {
    const libericaNativeImageFeaturesSlider = new Swiper(
      "#liberica-native-image-features-carousel",
      {
        effect: "fade",
        pagination: {
          el: "#liberica-native-image-features-carousel .swiper-pagination",
          clickable: true,
          autoHeight: true,
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

  initLibericaNativeImageSlider();
});
