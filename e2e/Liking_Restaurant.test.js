/* eslint-disable no-undef */
Feature('Liking Restaurant');
const assert = require('assert');

Before(({ I }) => {
  I.amOnPage('/#/favourite');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('resto-list');
  I.see('Data not found', '.no_data_message');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see('Data not found', '.no_data_message');

  I.amOnPage('/');

  I.waitForVisible('.about-restaurant-title a', 5);
  const firstRestaurant = locate('.about-restaurant-title a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favourite');
  I.seeElement('resto-list');
  const likedRestaurantTitle = await I.grabTextFrom('.about-restaurant-title a');

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});
