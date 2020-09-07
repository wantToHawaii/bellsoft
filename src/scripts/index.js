import initBsSlider from './bsSlider';

window.addEventListener('load', () => {
  const initHeaderMenu = () => {
    const iconMenuButton = document.querySelector('#icon-menu-button');
    const headerMenu = document.querySelector('#header-menu');
  
    iconMenuButton.addEventListener('click', () => {
      headerMenu.classList.toggle('active');
    });
  };
  
  const initFooterMenu = () => {
    const footer = document.querySelector('#site-footer');
    const toggleMenuButtons = footer.querySelectorAll('.button-toggle-menu');
    
    for (let button of toggleMenuButtons) {
      button.addEventListener('click', function() {
        this.classList.toggle('active');
      });
    }
  };
  
  const initCardsWithDropDownText = () => {
    const cardsWithDropDownText = document.querySelectorAll('.has-drop-down-text');
    const toggleCardDropDownText = function(e) {
      const card = this;
      const isButton = e.target.classList.contains('toggle-drop-down-text');
      if (isButton) {
        card.classList.toggle('drop-down-text-visible');
      }
    };
    if (cardsWithDropDownText && cardsWithDropDownText.length) {
      for (let card of cardsWithDropDownText) {
        card.addEventListener('click', toggleCardDropDownText);
      }
    }
  };
  
  const onContactFormSubmit = () => {
    const form = document.querySelector('#contact-form');
    const modal = form ? form.querySelector('.bs-callback-modal') : null;
    
    if (!form || !modal) return;
    
    const closeButtons = modal.querySelectorAll('[data-close]');
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.classList.add('submitted');
    });
  
    for (let btn of closeButtons) {
      btn.addEventListener('click', () => {
        form.classList.remove('submitted');
      });
    }
  };

  initHeaderMenu();
  initFooterMenu();
  initCardsWithDropDownText();
  onContactFormSubmit();
  initBsSlider('#java-runtime-slider');
  initBsSlider('#reviews-slider');
});
