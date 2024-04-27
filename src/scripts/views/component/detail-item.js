class DetailItem extends HTMLElement {
  set datas(datas) {
    this._datas = datas;
    this.render();
  }

  render() {
    this._datas.forEach((data) => {
      const itemElement = document.createElement('resto-item');
      itemElement.data = data;

      this.appendChild(itemElement);
    });
  }
}

customElements.define('detail-item', DetailItem);
