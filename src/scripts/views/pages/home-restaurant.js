import '../component/resto-item';
import '../component/resto-list';
import TheRestaurantSource from '../../data/restaurant-source';
import { createErrorTemplate } from '../templates/template-creator';
import RestaurantSearchPresenter from './restaurant-search-presenter';

const HomeRestaurant = {
  async render() {
    return `
    <form class="search-form" action="/" method="get">
      <input id="search-input" type="search" name="q" placeholder="Cari...">
      <button class="search-button" type="button"><i class="fa fa-search"></i></button>
    </form>

    <section class="description">
      <h1 class="description-title">Daftar restaurant kami</h1>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit quis tempora temporibus eos expedita
        dolorem dolore maiores fugit repellat! Vitae?</p>
    </section>

    <resto-list>
      <div class="loading">
        <p>Loading...</p>
      </div>
    </resto-list>
     `;
  },

  async afterRender() {
    const restaurantContainer = document.querySelector('resto-list');
    const restaurants = await TheRestaurantSource.restaurantList();
    restaurantContainer.innerHTML = '';
    if (!restaurants) {
      restaurantContainer.innerHTML = createErrorTemplate();
      return;
    }

    restaurantContainer.datas = restaurants;
    // eslint-disable-next-line no-new
    new RestaurantSearchPresenter({ restaurants: new TheRestaurantSource() });
  },
};

export default HomeRestaurant;
