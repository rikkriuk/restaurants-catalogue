import { createEmptyDataTemplate } from '../views/templates/template-creator';

const SearchRestaurantInitiator = {
  init({ restaurantContainer, restaurants }) {
    this._restaurantContainer = restaurantContainer;
    this._restaurants = restaurants;

    this._renderSearchRestaurant();
  },

  _renderSearchRestaurant() {
    const searchButton = document.querySelector('.search-button');
    searchButton.addEventListener('click', () => {
      const inputValue = document.querySelector('#search-input').value;
      this._searchRestaurant(inputValue);
    });
  },

  _searchRestaurant(input) {
    if (input === '') {
      return;
    }

    // eslint-disable-next-line arrow-body-style
    const filteredRestaurant = this._restaurants.filter((restaurant) => {
      return restaurant.name.toLowerCase().includes(input);
    });

    this._renderRestaurant(filteredRestaurant);
  },

  _renderRestaurant(restaurant) {
    this._restaurantContainer.innerHTML = '';
    if (restaurant.length === 0) {
      console.log(createEmptyDataTemplate());
      this._restaurantContainer.innerHTML = createEmptyDataTemplate();
    }

    this._restaurantContainer.datas = restaurant;
  },
};

export default SearchRestaurantInitiator;
