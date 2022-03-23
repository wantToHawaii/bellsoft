import Swiper from 'swiper';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import { watchResizeBreakpoint } from './utils';

const initCarousel = () => {
  const selector = '.carousel';
  return new Swiper(
    selector,
    {
      effect: "fade",
      autoHeight: true,
      pagination: {
        el: `${selector} .swiper-pagination`,
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

const initScrollContainer = () => {
  return new Swiper(".swiper-scroll-container", {
    direction: "horizontal",
    slidesPerView: "auto",
    freeMode: true,
    scrollbar: {
      el: ".swiper-scrollbar",
    },
    mousewheel: true,
  });
};

const initImagePopups = () => {
  const popup = document.querySelector('[data-role="image-popup"]');
  const closePopupElements = popup.querySelectorAll('[data-role="image-popup-action-close"]');

  const openPopup = (imageSrc, text) => {
    const img = popup.querySelector('[data-role="image-popup-image"]');
    const textContainer = popup.querySelector('[data-role="image-popup-text"]');
    img.setAttribute('src', imageSrc);
    textContainer.textContent = text;
    document.body.style.setProperty('overflow', 'hidden');
    popup.classList.add('active');
  };

  const closePopup = () => {
    popup.classList.remove('active');
    document.body.style.removeProperty('overflow');
  };

  closePopupElements.forEach(element => {
    element.addEventListener('click', () => {
      closePopup();
    });
  });

  const containers = document.querySelectorAll('[data-plugin="image-popup"]');
  containers.forEach(container => {
    const initiator = container.querySelector('[data-role="image-popup-action-open"]');
    const targetText = container.querySelector('[data-role="image-popup-target-text"]');
    initiator.addEventListener('click', () => {
      openPopup(initiator.src, targetText.textContent);
    });
  });
};

window.addEventListener("load", () => {
  if (document.querySelector('.page-template-blocks')) {
    const carousel = initCarousel();
    initImagePopups();
    initScrollContainer();

    Prism.manual = true;
    Prism.highlightAll();

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