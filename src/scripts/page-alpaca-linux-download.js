import Swiper from 'swiper';
import './common';
import { watchResizeBreakpoint, copyToClipboard } from './utils';

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

const initBuildsTabs = () => {
  const ACTIVE_CLASS = 'active';

  const tabsContainer = document.querySelector('[data-plugin="tabs"]');
  const tabs = [...tabsContainer.querySelectorAll('[data-role="tabs-action-show"]')];
  const contents = [...tabsContainer.querySelectorAll('[data-role="tabs-content"]')];
  
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      if (tab.classList.contains(ACTIVE_CLASS)) {
        return;
      }

      const activeSiblingIndex = tabs.findIndex(sibling => sibling.classList.contains(ACTIVE_CLASS));
      const sibling = tabs[activeSiblingIndex];
      const siblingContent = contents[activeSiblingIndex];
      sibling.classList.remove(ACTIVE_CLASS);
      siblingContent.classList.remove(ACTIVE_CLASS);

      tab.classList.add(ACTIVE_CLASS);
      contents[index].classList.add(ACTIVE_CLASS);
    });
  });
};

const initBuildsRadioContentSwitch = () => {
  const ACTIVE_CONTENT_CLASS = 'active';

  const containers = document.querySelectorAll('[data-plugin="radio-switch"]');

  containers.forEach(container => {
    const radioButtons = container.querySelectorAll('[data-role="radio-switch-action-show"]');
    const contents = [...container.querySelectorAll('[data-role="radio-switch-content"]')];

    radioButtons.forEach((radio, index) => {
      radio.addEventListener('change', (e) => {
        contents.forEach(content => content.classList.remove(ACTIVE_CONTENT_CLASS));
        const currentContent = contents[index];

        currentContent.classList.add(ACTIVE_CONTENT_CLASS);
      });
    });
  });
};

const initBuildsCopyChecksum = () => {
  const appendTooltip = () => {
    const container = document.createElement('div');
    const text = document.createElement('div');
    text.classList.add('text');
    container.classList.add('copy-tooltip');
    container.appendChild(text);
    document.body.appendChild(container);
    return { container, text };
  };

  const tooltip = appendTooltip();
  let tooltipTimeoutId;

  const hideTooltip = () => {
    tooltip.container.style.display = 'none';
    tooltip.text.innerText = '';
  }
  const showTooltip = (text) => {
    tooltip.text.innerText = text;
    tooltip.container.style.display = 'block';
  };
  const placeTooltip = (target) => {
    tooltip.container.style.top = `${target.y - target.height / 2 + 4}px`;
    tooltip.container.style.left = `${target.right + 16}px`;
  };

  const mockChecksum = { '11.0.14.1+1/bellsoft-jdk11.0.14.1+1-macos-amd64.pkg': 'fedf8a1659a0584d1179d689a760e026f8e85407' };
  const copyButtons = document.querySelectorAll('[data-copy-checksum]');

  copyButtons.forEach(button => {
    button.addEventListener('mouseover', () => {
      const tooltipTarget = button.getBoundingClientRect();
      placeTooltip(tooltipTarget);
      showTooltip('Copy');
    });
    button.addEventListener('mouseleave', () => {
      hideTooltip();
      if (tooltipTimeoutId) {
        clearTimeout(tooltipTimeoutId);
        tooltipTimeoutId = undefined;
      } 
    });
    button.addEventListener('click', () => {
      const checksum = mockChecksum[button?.dataset?.copyChecksum];
      copyToClipboard(checksum);
      showTooltip('Copied!');
      tooltipTimeoutId = setTimeout(() => hideTooltip(), 1000);
    });
  });
};

const initQuestionsAccordion = () => {
  const ACTIVE_CLASS = 'active';

  const accordion = document.querySelector('[data-plugin="accordion"]');
  const items = [...accordion.querySelectorAll('[data-role="accordion-item"]')];
  const getToggleButton = (item) => item.querySelector('[data-role="accordion-action-toggle"]');
  const getContent = (item) => item.querySelector('[data-role="accordion-content"]');

  const open = (item) => {
    const content = getContent(item);
    item.classList.add(ACTIVE_CLASS);
    content.style.maxHeight = content.scrollHeight + 'px';
  };

  const close = (item) => {
    const content = getContent(item);
    item.classList.remove(ACTIVE_CLASS);
    content.style.maxHeight = null;
  };

  items.forEach((item) => {
    const toggleButton = getToggleButton(item);
    toggleButton.addEventListener('click', () => {
      const activeSibling = items.find(sibling =>
        sibling.classList.contains(ACTIVE_CLASS) && sibling !== item
      );
      if (activeSibling) {
        close(activeSibling);
      }
      if (item.classList.contains(ACTIVE_CLASS)) {
        close(item);
      } else {
        open(item);
      }
    });
  });
};

window.addEventListener("load", () => {
  if (document.querySelector('.page-alpaca-linux-download')) {
    const carousel = initCarousel();
    initGetStartedCarousel();
    initQuestionsAccordion();
    initBuildsTabs();
    initBuildsRadioContentSwitch();
    initBuildsCopyChecksum();

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