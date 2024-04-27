import API_ENDPOINT from '../globals/api-endpoint';

class TheRestaurantSource {
  static async restaurantList() {
    try {
      const response = await fetch(API_ENDPOINT.HOME_RESTAURANT);

      if (!response.ok) {
        throw new Error(`HTTP error! Status ${response.status}`);
      }

      const data = await response.json();
      return data.restaurants;
    } catch (error) {
      console.error('Error fetching data: ', error);
      return null;
    }
  }

  static async restaurantImage(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    return response.json();
  }

  static async detailRestaurant(id) {
    try {
      const response = await fetch(API_ENDPOINT.DETAIL(id));

      if (!response.ok) {
        throw new Error(`HTTP error! Status ${response.status}`);
      }

      const data = await response.json();
      return data.restaurant;
    } catch (error) {
      console.error('Error fetching data: ', error);
      return null;
    }
  }

  // eslint-disable-next-line class-methods-use-this, no-empty-function, no-unused-vars
  async searchRestaurants(query) {
    const restaurants = await TheRestaurantSource.restaurantList();
    // eslint-disable-next-line arrow-body-style
    const filteredRestaurant = restaurants.filter((restaurant) => {
      return restaurant.name.toLowerCase().includes(query);
    });

    return filteredRestaurant;
  }
}

export default TheRestaurantSource;
