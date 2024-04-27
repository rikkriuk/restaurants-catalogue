/* eslint-disable no-undef */
import { spyOn } from 'jest-mock';
import RestaurantSearchPresenter from '../src/scripts/views/pages/restaurant-search-presenter';
import TheRestaurantSource from '../src/scripts/data/restaurant-source';

describe('Searching Restaurant', () => {
  let presenter;
  const theRestaurantSourceInstance = new TheRestaurantSource();

  const searchRestaurants = (query) => {
    const queryElement = document.getElementById('search-input');
    const searchButton = document.querySelector('.search-button');
    queryElement.value = query;

    searchButton.dispatchEvent(new Event('click'));
  };

  const setRestaurantSearchContainer = () => {
    document.body.innerHTML = `
    <main>
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
    </main>
    `;
  };

  const constructPresenter = () => {
    spyOn(theRestaurantSourceInstance, 'searchRestaurants');
    presenter = new RestaurantSearchPresenter({
      restaurants: theRestaurantSourceInstance,
    });
  };

  beforeEach(() => {
    setRestaurantSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {
    it('should capture the query as empty', () => {
      theRestaurantSourceInstance.searchRestaurants.mockImplementation(() => []);

      searchRestaurants(' ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('    ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });

    it('should be able to capture the query typed by the user', async () => {
      theRestaurantSourceInstance.searchRestaurants.mockImplementation(() => []);
      searchRestaurants('restaurant a');

      expect(presenter.latestQuery).toEqual('restaurant a');
    });

    it('should ask the model to search for restaurants', () => {
      theRestaurantSourceInstance.searchRestaurants.mockImplementation(() => []);

      searchRestaurants('restaurant a');

      expect(theRestaurantSourceInstance.searchRestaurants).toHaveBeenCalledWith('restaurant a');
    });

    it('should show the found restaurants', () => {
      presenter._showFoundRestaurants([{ id: 1 }]);
      expect(document.querySelectorAll('resto-item').length).toEqual(1);

      presenter._showFoundRestaurants([
        {
          id: 1,
          name: 'Satu',
        },
        {
          id: 2,
          name: 'Dua',
        },
      ]);
      expect(document.querySelectorAll('resto-item').length).toEqual(2);
    });

    it('should show the title of the found restaurants', () => {
      presenter._showFoundRestaurants([
        {
          id: 1,
          name: 'Satu',
        },
      ]);

      expect(document.querySelectorAll('.about-restaurant-title a').item(0).textContent).toEqual('Satu');

      presenter._showFoundRestaurants([
        {
          id: 1,
          name: 'Satu',
        },
        {
          id: 2,
          name: 'Dua',
        },
      ]);
      const restaurantTitles = document.querySelectorAll('.about-restaurant-title a');
      expect(restaurantTitles.item(0).textContent).toEqual('Satu');
      expect(restaurantTitles.item(1).textContent).toEqual('Dua');
    });

    it('should show the restaurants found', (done) => {
      document
        .querySelector('main')
        .addEventListener('resto-list:searched:updated', () => {
          expect(document.querySelectorAll('resto-item').length).toEqual(3);

          done();
        });

      theRestaurantSourceInstance.searchRestaurants.mockImplementation((query) => {
        if (query === 'restaurant a') {
          return [
            { id: 111, name: 'restaurant abc' },
            { id: 222, name: 'ada juga restaurant abcde' },
            { id: 333, name: 'ini juga boleh restaurant a' },
          ];
        }
        return [];
      });

      searchRestaurants('restaurant a');
    });

    it('should show the name of the restaurants found', (done) => {
      document
        .querySelector('main')
        .addEventListener('resto-list:searched:updated', () => {
          const restaurantTitles = document.querySelectorAll('.about-restaurant-title a');
          expect(restaurantTitles.item(0).textContent).toEqual('restaurant abc');
          expect(restaurantTitles.item(1).textContent).toEqual('ada juga restaurant abcde');
          expect(restaurantTitles.item(2).textContent).toEqual('ini juga boleh restaurant a');

          done();
        });

      theRestaurantSourceInstance.searchRestaurants.mockImplementation((query) => {
        if (query === 'restaurant a') {
          return [
            { id: 111, name: 'restaurant abc' },
            { id: 222, name: 'ada juga restaurant abcde' },
            { id: 333, name: 'ini juga boleh restaurant a' },
          ];
        }
        return [];
      }, 1000);

      searchRestaurants('restaurant a');
    });
  });

  describe('When no restaurant could be found', () => {
    it('should show the empty message', (done) => {
      document
        .querySelector('main')
        .addEventListener('resto-list:searched:updated', () => {
          expect(document.querySelectorAll('.no_data').length).toEqual(1);
          done();
        });

      theRestaurantSourceInstance.searchRestaurants.mockImplementation(() => []);
      searchRestaurants('resaurant a');
    });

    it('should not show any restaurant', (done) => {
      document.querySelector('main')
        .addEventListener('resto-list:searched:updated', () => {
          expect(document.querySelectorAll('resto-item').length).toEqual(0);
          done();
        });
      theRestaurantSourceInstance.searchRestaurants.mockImplementation(() => []);
      searchRestaurants('restaurant a');
    });
  });
});
