import { createRestaurantItemTemplate } from '../templates/template-creator';

class RestoItem extends HTMLElement {
  set data(data) {
    this._data = data;
    this.render();
  }

  render() {
    this.innerHTML = createRestaurantItemTemplate(this._data);
  }
}

customElements.define('resto-item', RestoItem);
