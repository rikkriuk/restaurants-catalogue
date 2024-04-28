import CONFIG from '../../globals/config';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const createRestaurantItemTemplate = (restaurant) => `<div class="location">
<h3>Kota. ${restaurant.city}</h3>
</div>
<div class="picture">
<picture>
  <source media="(max-width: 600px)" data-srcset="${`${CONFIG.BASE_IMAGE_URL}/small/${restaurant.pictureId}`}" type="image/jpeg" >
  <img class="lazyload" crossorigin="anonymous" data-src="${`${CONFIG.BASE_IMAGE_URL}/medium/${restaurant.pictureId}`}" alt="">
</picture>
</div>
<div class="about-restaurant">
<div class="about-restaurant-rating">
  <svg fill="#e7e713" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" class="icon">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path
        d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z">
      </path>
    </g>
  </svg>

  <h3 class="restaurant-rating">Rating ${restaurant.rating}</h3>
</div>
<h2 class="about-restaurant-title"><a href="#/detail/${restaurant.id}" tabindex="0">${restaurant.name}</a></h2>
<p class="about-restaurant-des">${restaurant.description}</p>
</div>`;

const createDetailItemTemplate = (restaurant) => {
  const reviewsHTML = restaurant.customerReviews.map((review) => `
    <div class="list-review">
      <h3>${review.name}</h3>
      <p>"${review.review}" - ${review.date}</p>
    </div>
  `).join('');

  const foodsMenuHTML = restaurant.menus.foods.map((menu) => menu.name).join(', ');
  const drinksMenuHTML = restaurant.menus.drinks.map((menu) => menu.name).join(', ');
  const categoriesHTML = restaurant.categories.map((category) => category.name).join(', ');

  return `
    <h1 class="restaurant__title">${restaurant.name}</h1>
    <section class="detail_content">
    <picture>
      <source media="(max-width: 600px)" data-srcset="${`${CONFIG.BASE_IMAGE_URL}/small/${restaurant.pictureId}`}" type="image/jpeg" >
      <img class="lazyload" crossorigin="anonymous" data-src="${`${CONFIG.BASE_IMAGE_URL}/large/${restaurant.pictureId}`}" alt="">
    </picture>
      <div class="restaurant__detail">
        <h3>Rating</h3>
        <p>⭐️ ${restaurant.rating}</p>
        <h3>Kota</h3>
        <p>${restaurant.city}</p>
        <h3>Alamat</h3>
        <p>${restaurant.address}</p>
        <h3>Kategori</h3>
        <p>${categoriesHTML}</p>
        <h3>Menu Makanan</h3>
        <p>${foodsMenuHTML}</p>
        <h3>Menu Minuman</h3>
        <p>${drinksMenuHTML}</p>
      </div>
      <div class="restaurant__description">
        <h3>Deskripsi</h3>
        <p>${restaurant.description}</p>
      </div>
      <div class="customer-reviews">
        <h2>Costomer Reviews</h2>
        <div class="list-customer">
          ${reviewsHTML}
        </div>
      </div>
    </section>
  `;
};

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

const createErrorTemplate = () => `
  <div class="not_found">
    <p>Failed to get resources</p>
  </div>
`;

const createEmptyDataTemplate = () => `
  <div class="no_data">
    <p class="no_data_message">Data not found</p>
  </div>
`;

export {
  createRestaurantItemTemplate,
  createDetailItemTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
  createErrorTemplate,
  createEmptyDataTemplate,
};
