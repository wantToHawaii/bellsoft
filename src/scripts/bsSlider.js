import addSwipeListeners from './swipeListeners';

const bsSlider = (selector) => {
  const slider = document.querySelector(selector);

  if (!slider) return;

  const slides = slider.querySelectorAll('.slide');
  const arrowPrev = slider.querySelector('.bs-slider-arrow.left');
  const arrowNext = slider.querySelector('.bs-slider-arrow.right');
  const dotsContainer = slider.querySelector('.bs-slider-dots');
  const slidesIndexes = [];

  const setDotActiveClass = (activeSlideIndex) => {
    const dots = dotsContainer.querySelectorAll('.dot');
    for (let item of dots) {
      item.classList.remove('active');
      if (item.dataset.index === activeSlideIndex) {
        item.classList.add('active');
      }
    }
  };

  const createDot = (index) => {
    const dotDiv = document.createElement('div');
    dotDiv.classList.add('dot');
    if (index === 0) {
      dotDiv.classList.add('active');
    }
    dotDiv.dataset.index = index;
    dotsContainer.appendChild(dotDiv);
  };

  (() => {
    let index = 0;
    while (slides.length > index) {
      createDot(index);
      slidesIndexes.push(index++);
    }
  })();

  const updateSlidesDataIndex = (arr) => {
    for(let i = 0; i < slides.length; i++) {
      slides[i].dataset.index = arr[i];
    }
  }

  const onSwipePrev = () => {
    slidesIndexes.unshift(slidesIndexes.pop());
    updateSlidesDataIndex(slidesIndexes);
    setDotActiveClass(slides[0].dataset.index);
  };

  const onSwipeNext = () => {
    slidesIndexes.push(slidesIndexes.shift());
    updateSlidesDataIndex(slidesIndexes);
    setDotActiveClass(slides[0].dataset.index);
  };

  arrowPrev.addEventListener('click', onSwipePrev);
  arrowNext.addEventListener('click', onSwipeNext);
  addSwipeListeners(selector, onSwipeNext, onSwipePrev);

  dotsContainer.addEventListener('click', (e) => {
    const slideIndex = e.target.dataset.index;
    if (slideIndex >= 0) {
      slidesIndexes.push(slidesIndexes.shift());
      slidesIndexes.splice(0, 1, Number(slideIndex));
      updateSlidesDataIndex(slidesIndexes);
      setDotActiveClass(slides[0].dataset.index);
    }
  });

  updateSlidesDataIndex(slidesIndexes);
};

export default bsSlider;
