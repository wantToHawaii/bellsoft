const addSwipeListeners = (selector, onSwipeLeft, onSwipeRight) => {
  const minHorizontalMove = 30;
  const maxVerticalMove = 30;
  const withinMs = 1000;
  
  let startXPos;
  let startYPos;
  let startTime;
  function touchStart(event) {
    startXPos = event.touches[0].pageX;
    startYPos = event.touches[0].pageY;
    startTime = new Date();
  }

  function touchEnd(event) {
    const endXPos = event.changedTouches[0].pageX;
    const endYPos = event.changedTouches[0].pageY;
    const endTime = new Date();
    let moveX = endXPos - startXPos;
    let moveY = endYPos - startYPos;
    let elapsedTime = endTime - startTime;
    if (Math.abs(moveX) > minHorizontalMove && Math.abs(moveY) < maxVerticalMove && elapsedTime < withinMs) {
      if (moveX < 0) {
        onSwipeLeft();
      } else {
        onSwipeRight();
      }
    }
  }
  
  const content = document.querySelector(selector);
  content.addEventListener('touchstart', touchStart);
  content.addEventListener('touchend', touchEnd);
};

export default addSwipeListeners;
