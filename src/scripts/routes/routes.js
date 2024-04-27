import HomeRestaurant from '../views/pages/home-restaurant';
import FavouriteRestaurant from '../views/pages/favourite-restaurant';
import DetailRestaurant from '../views/pages/detail-restaurant';

const routes = {
  '/': HomeRestaurant,
  '/favourite': FavouriteRestaurant,
  '/detail/:id': DetailRestaurant,
};

export default routes;
