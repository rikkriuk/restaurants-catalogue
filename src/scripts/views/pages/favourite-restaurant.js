import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import { createEmptyDataTemplate } from '../templates/template-creator';

const Like = {
  async render() {
    return `
      <section class="description">
         <h1 class="description-title">Daftar restaurant favorit</h1>
         <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit quis tempora temporibus eos expedita
         dolorem dolore maiores fugit repellat! Vitae?</p>
      </section>

      <resto-list>
      </resto-list>
      `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurant();
    const restaurantContainer = document.querySelector('resto-list');
    restaurantContainer.innerHTML = '';

    if (restaurants.length === 0) {
      restaurantContainer.style.gridTemplateColumns = 'repeat(1, 1fr)';
      restaurantContainer.innerHTML = createEmptyDataTemplate();
      return;
    }

    restaurantContainer.datas = restaurants;
  },
};

export default Like;
