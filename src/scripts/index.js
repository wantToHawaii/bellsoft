import Swiper, {
  Pagination,
  Navigation,
  EffectFade,
  Scrollbar,
  Mousewheel,
} from "swiper";
import "swiper/swiper.scss";
import "swiper/components/effect-fade/effect-fade.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/scrollbar/scrollbar.scss";

Swiper.use([Pagination, Navigation, EffectFade, Scrollbar, Mousewheel]);

window.addEventListener("load", () => {
  const initHeaderMenu = () => {
    const header = document.querySelector("#site-header");

    if (!header) return;

    const menu = header.querySelector("#header-menu");
    const iconMenuButton = header.querySelector("#icon-menu-button");

    iconMenuButton.addEventListener("click", () => {
      menu.classList.toggle("active");
    });
  };

  const initFooterMenu = () => {
    const footer = document.querySelector("#site-footer");

    if (!footer) return;

    const toggleMenuButtons = footer
      ? footer.querySelectorAll(".button-toggle-menu")
      : null;

    for (let button of toggleMenuButtons) {
      button.addEventListener("click", function () {
        this.classList.toggle("active");
      });
    }
  };

  const initCardsWithDropDownText = () => {
    const cardsWithDropDownText = document.querySelectorAll(
      ".has-drop-down-text"
    );
    const toggleCardDropDownText = function (e) {
      const card = this;
      const isButton = e.target.classList.contains("toggle-drop-down-text");
      if (isButton) {
        card.classList.toggle("drop-down-text-visible");
      }
    };
    if (cardsWithDropDownText && cardsWithDropDownText.length) {
      for (let card of cardsWithDropDownText) {
        card.addEventListener("click", toggleCardDropDownText);
      }
    }
  };

  const onContactFormSubmit = (selector) => {
    const form = document.querySelector(selector);
    const modal = form ? form.querySelector(".bs-callback-modal") : null;

    if (!form || !modal) return;

    const closeButtons = modal.querySelectorAll("[data-close]");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      form.classList.add("submitted");
    });

    for (let btn of closeButtons) {
      btn.addEventListener("click", () => {
        form.classList.remove("submitted");
      });
    }
  };

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

  const initPageCareerTabsSection = () => {
    const sectionId = "#page-career-tabs-section";

    const tabsButtons = document.querySelectorAll(`${sectionId} .tab-button`);
    const tabs = new Swiper(`${sectionId} .tabs-contents`, {
      effect: "fade",
      slidesPerView: 1,
      initialSlide: 3,
      simulateTouch: false,
      autoHeight: true,
      fadeEffect: {
        crossFade: true,
      },
      speed: 800,
    });
    const slideDownButtons = document.querySelectorAll(
      `${sectionId} .button-toggle-container`
    );

    const switchTabButtonClasses = (button, isActive = false) => {
      button.classList.remove(isActive ? "outlined" : "contained");
      button.classList.add(isActive ? "contained" : "outlined");
    };

    const addTabsButtonsListeners = () => {
      for (let i = 0; i < tabsButtons.length; i += 1) {
        const button = tabsButtons[i];
        button.addEventListener("click", () => {
          // make sure all buttons are not emphasized except the target
          tabsButtons.forEach((b) => switchTabButtonClasses(b));
          // switch classes of the target button
          switchTabButtonClasses(button, true);
          tabs.slideTo(i);
        });
      }
    };

    const addListenersToSlideDownButtons = () => {
      for (let button of slideDownButtons) {
        const className = "active";

        button.addEventListener("click", () => {
          const toggledContainerHeight = button.nextElementSibling.scrollHeight;
          const initialTabsHeight = Number(
            tabs.$wrapperEl[0].style.height.replace("px", "")
          );

          if (button.classList.contains(className)) {
            button.classList.remove(className);
            button.nextElementSibling.classList.remove("slide-down");
            button.nextElementSibling.classList.add("slide-up");
            // tabs.$wrapperEl[0].style.transitionDuration = "700ms";
            // tabs.$wrapperEl[0].style.transitionDelay = "550ms";
            tabs.$wrapperEl[0].style.height = `${
              initialTabsHeight - toggledContainerHeight
            }px`;
          } else {
            button.classList.add(className);
            button.nextElementSibling.classList.remove("slide-up");
            button.nextElementSibling.classList.add("slide-down");
            // tabs.$wrapperEl[0].style.transitionDuration = "400ms";
            // tabs.$wrapperEl[0].style.transitionDelay = "0ms";
            tabs.$wrapperEl[0].style.height = `${
              initialTabsHeight + toggledContainerHeight
            }px`;
          }
        });
      }
    };

    // change class of the initial active tab button
    switchTabButtonClasses(tabsButtons[tabs.activeIndex], true);
    addTabsButtonsListeners();
    addListenersToSlideDownButtons();
  };

  const initPageCareerAccordionSection = () => {
    const sectionId = "#page-career-accordion-section";
    const blocks = [...document.querySelectorAll(`${sectionId} .block`)];

    const scrollContainers = new Swiper(`${sectionId} .swiper-container`, {
      direction: "vertical",
      slidesPerView: "auto",
      freeMode: true,
      mousewheel: true,
      watchOverflow: true,
      scrollbar: {
        el: ".swiper-scrollbar",
      },
      breakpoints: {
        1024: {
          direction: "horizontal",
          slidesPerView: 1,
          freeMode: false,
          mousewheel: false,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        },
      },
    });

    const switchBlocksClasses = (block) => {
      if (
        block.classList.contains("expanded") ||
        block.classList.contains("collapsed")
      ) {
        blocks.forEach((el) => {
          el.classList.remove("collapsed");
          el.classList.remove("expanded");
        });
        return false;
      } else {
        blocks
          .filter((b) => b !== block)
          .forEach((el) => el.classList.add("collapsed"));
        block.classList.add("expanded");
        return true;
      }
    };

    for (let block of blocks) {
      block.addEventListener("click", () => {
        const isActive = switchBlocksClasses(block);
        if (isActive) {
          const activeContent = block.nextElementSibling;
          const swiperContainer = scrollContainers.find((c) => {
            return c.el === activeContent.firstElementChild;
          });
          // after animation swiper height is broken
          // so we need to be updated it using timeout kostil :)
          setTimeout(() => swiperContainer.update(), 600);
        }
      });
    }
  };

  initHeaderMenu();
  initFooterMenu();
  initCardsWithDropDownText();
  onContactFormSubmit("#contact-form");

  initLibericaNativeImageSlider();

  initPageCareerTabsSection();
  initPageCareerAccordionSection();
});
