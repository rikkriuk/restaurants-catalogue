import 'regenerator-runtime';
import '../styles/main.scss';
import '../styles/responsive.scss';
import App from './views/app';
import swRegister from './utils/sw-register';

const app = new App({
  openButton: document.querySelector('.app-header__menu-btn--open'),
  closeButton: document.querySelector('.app-header__menu-btn--close'),
  drawer: document.querySelector('.app-header__navbar'),
  content: document.querySelector('#main-content'),
  skipToContentButton: document.querySelector('.skip-link'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
