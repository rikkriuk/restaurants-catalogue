import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({
    openButton, closeButton, drawer, content, skipToContentButton,
  }) {
    this._openButton = openButton;
    this._closeButton = closeButton;
    this._drawer = drawer;
    this._content = content;
    this._skipToContentButton = skipToContentButton;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      openButton: this._openButton,
      closeButton: this._closeButton,
      drawer: this._drawer,
      content: this._content,
      skipToContentButton: this._skipToContentButton,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();
  }
}

export default App;
