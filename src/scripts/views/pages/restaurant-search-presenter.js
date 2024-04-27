import { createRestaurantItemTemplate, createEmptyDataTemplate } from '../templates/template-creator';

class RestaurantSearchPresenter {
  constructor({ restaurants }) {
    this._listenToSearchRequestByUser();
    this._restaurants = restaurants;
  }

  _listenToSearchRequestByUser() {
    this._queryElement = document.getElementById('search-input');
    this._searchButton = document.querySelector('.search-button');
    this._searchButton.addEventListener('click', () => {
      this._searchRestaurants(this._queryElement.value);
    });
  }

  async _searchRestaurants(latestQuery) {
    this._latestQuery = latestQuery.trim();
    const foundRestaurants = await this._restaurants.searchRestaurants(this.latestQuery);
    this._showFoundRestaurants(foundRestaurants);
  }

  // eslint-disable-next-line class-methods-use-this
  _showFoundRestaurants(restaurants) {
    const restaurantContainer = document.querySelector('resto-list');

    if (restaurants.length > 0) {
      restaurantContainer.innerHTML = '';
      restaurants.forEach((restaurant) => {
        const itemElement = document.createElement('resto-item');
        itemElement.innerHTML = createRestaurantItemTemplate(restaurant);
        restaurantContainer.appendChild(itemElement);
      });
    } else {
      restaurantContainer.innerHTML = createEmptyDataTemplate();
    }

    document
      .querySelector('main')
      .dispatchEvent(new Event('resto-list:searched:updated'));
  }

  get latestQuery() {
    return this._latestQuery;
  }
}

export default RestaurantSearchPresenter;
