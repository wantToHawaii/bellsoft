window.addEventListener('load', () => {
  const iconMenuButton = document.querySelector('#icon-menu-button');
  const headerMenu = document.querySelector('#header-menu');

  iconMenuButton.addEventListener('click', () => {
    headerMenu.classList.toggle('active');
  });
});
