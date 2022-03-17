import './common';

window.addEventListener('load', () => {
  if (!document.querySelector('.page-libericajdk-vs-openjdk')) return;

  const anchorsMenu = document.querySelector('#page-libericajdk-vs-openjdk-anchors');
  const sectionHero = document.querySelector('#page-libericajdk-vs-openjdk-hero')

  const reviewCard1 = document.querySelector('.bs-card-review.one');
  const reviewCard2 = document.querySelector('.bs-card-review.two');

  const changeAnchorsMenuBackgroundOnScroll = (menu, hero) => {
    if (window.scrollY >= hero.clientHeight) {
      if (!menu.classList.contains('blue')) {
        menu.classList.add('blue');
      }
    } else if (menu.classList.contains('blue')) {
      menu.classList.remove('blue');
    }
  };

  const addClassToReviewCardsOnScroll = (...cards) => {
    const isInView = (el) => {
      return (el.getBoundingClientRect().top - window.innerHeight) <= 0;
    }
    const manageClass = (el) => {
      if (!el.classList.contains('animate')) {
        el.classList.add('animate');
      }
    }
    cards.forEach(item => {
      if (isInView(item)) manageClass(item);
    })
  };

  const initPopups = () => {
    const popupButtons = document.querySelectorAll('[data-action="show-popup"]');
    popupButtons.forEach(item => {
      item.addEventListener('click', () => {
        const { target } = item.dataset;
        const popup = document.querySelector(target);
        const closePopupButtons = popup.querySelectorAll('[data-action="close"]');

        if (!popup.classList.contains('active')) {
          document.body.style.setProperty('overflow', 'hidden');
          popup.classList.add('active');
        }

        for (btn of closePopupButtons) {
          btn.addEventListener('click', () => {
            if (popup.classList.contains('active')) {
              document.body.style.removeProperty('overflow');
              popup.classList.remove('active');
            }
          });
        }
      });
    });
  };


  changeAnchorsMenuBackgroundOnScroll(anchorsMenu, sectionHero)
  addClassToReviewCardsOnScroll(reviewCard1, reviewCard2);
  initPopups();

  window.addEventListener('scroll', () => {
    changeAnchorsMenuBackgroundOnScroll(anchorsMenu, sectionHero)
    addClassToReviewCardsOnScroll(reviewCard1, reviewCard2);
  });
});
