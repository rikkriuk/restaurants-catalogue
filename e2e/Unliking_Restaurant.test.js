/* eslint-disable no-undef */
Feature('Unliking Restaurant');
const assert = require('assert');

Scenario('Unliking one restaurant', async ({ I }) => {
  I.amOnPage('/');
  I.waitForVisible('.about-restaurant-title a', 5);
  const firstLikedRestaurant = locate('.about-restaurant-title a').first();
  const firstLikedRestaurantTitle = await I.grabTextFrom(firstLikedRestaurant);

  I.click(firstLikedRestaurant);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favourite');
  I.seeElement('resto-list');
  const likedRestaurantTitle = await I.grabTextFrom('.about-restaurant-title a');
  assert.strictEqual(firstLikedRestaurantTitle, likedRestaurantTitle);

  I.click('.about-restaurant-title a');
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/');
  I.amOnPage('/#/favourite');
  I.see('Data not found', '.no_data_message');
});
