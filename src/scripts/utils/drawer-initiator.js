const DrawerInitiator = {
  init({
    openButton, closeButton, drawer, content, skipToContentButton,
  }) {
    openButton.addEventListener('click', (event) => {
      this._toggleDrawer(event, drawer);
    });

    closeButton.addEventListener('click', (event) => {
      this._toggleDrawer(event, drawer);
    });

    skipToContentButton.addEventListener('click', (event) => {
      this._skipToContent(event, content);
    });

    content.addEventListener('click', (event) => {
      this._closeDrawer(event, drawer);
    });

    window.addEventListener('resize', () => {
      this._toggleOverlay(drawer);
    });

    window.addEventListener('load', () => {
      this._toggleOverlay(drawer);
    });
  },

  _toggleDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.toggle('open');
  },

  _closeDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.remove('open');
  },

  _skipToContent(event, content) {
    event.preventDefault();
    content.focus();
  },

  _toggleOverlay(drawer) {
    if (window.innerWidth > 600) {
      drawer.classList.remove('overlay');
    } else {
      drawer.classList.add('overlay');
    }
  },
};

export default DrawerInitiator;
