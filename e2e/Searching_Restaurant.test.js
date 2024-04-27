/* eslint-disable no-undef */
Feature('Searching Restaurant');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('Searching restaurants with specific keyword', async ({ I }) => {
  I.waitForVisible('form', 5);

  const restaurantName = 'kafe kita';

  I.fillField('input[type="search"]', restaurantName);
  I.click('.search-button');

  I.waitForElement('resto-item', 5);
  I.waitForText(restaurantName, 5, '.about-restaurant-title a');
});

Scenario('Searching restaurants with no results', async ({ I }) => {
  I.waitForVisible('form', 5);

  I.fillField('input[type="search"]', '12345');
  I.wait(1);

  I.click('.search-button');
  I.waitForText('Data not found', 5, '.no_data_message');
});
