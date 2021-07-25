window.addEventListener('load', () => {
  const changeAnchorsMenuBackgroundOnScroll = () => {
    const anchorsMenu = document.querySelector('#page-libericajdk-vs-openjdk-anchors');
    const sectionHero = document.querySelector('#page-libericajdk-vs-openjdk-hero')
    if (anchorsMenu && sectionHero) {
      window.addEventListener('scroll', (e) => {
        if (window.scrollY >= sectionHero.clientHeight) {
          if (!anchorsMenu.classList.contains('blue')) {
            anchorsMenu.classList.add('blue');
          }
        } else if (anchorsMenu.classList.contains('blue')) {
          anchorsMenu.classList.remove('blue');
        }
      });
    }
  };

  changeAnchorsMenuBackgroundOnScroll();
});
