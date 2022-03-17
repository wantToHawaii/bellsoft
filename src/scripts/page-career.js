import Swiper from "swiper";

window.addEventListener("load", () => {
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
      button?.classList.remove(isActive ? "outlined" : "contained");
      button?.classList.add(isActive ? "contained" : "outlined");
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
      const expandedClass = "expanded";
      const collapsedClass = "collapsed";
      const isExpanded =
        block.classList.contains(expandedClass) ||
        block.classList.contains(collapsedClass);
      if (isExpanded) {
        blocks.forEach((el) => {
          el.classList.remove(collapsedClass);
          el.classList.remove(expandedClass);
        });
      } else {
        blocks
          .filter((b) => b !== block)
          .forEach((el) => el.classList.add(collapsedClass));
        block.classList.add(expandedClass);
      }
      return !isExpanded;
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

  const initCallbackPopup = () => {
    const body = document.querySelector("body");
    const popup = document.querySelector("#callback-popup");
    const closePopupButtons = popup?.querySelectorAll(
      '[data-action="close-callback-popup"]'
    );
    const showPopupButton = document.querySelectorAll(
      '[data-action="show-callback-popup"]'
    );

    if (showPopupButton) {
      for (let btn of showPopupButton) {
        btn.addEventListener("click", (e) => {
          console.log("e.preventDefault", e.preventDefault);
          e.preventDefault();
          if (!popup.classList.contains("active")) {
            body.style.setProperty("overflow", "hidden");
            popup.classList.add("active");
          }
        });
      }
    }

    if (closePopupButtons) {
      for (let btn of closePopupButtons) {
        btn.addEventListener("click", () => {
          if (popup.classList.contains("active")) {
            body.style.removeProperty("overflow");
            popup.classList.remove("active");
          }
        });
      }
    }
  };

  initPageCareerTabsSection();
  initPageCareerAccordionSection();
  initCallbackPopup();
});
