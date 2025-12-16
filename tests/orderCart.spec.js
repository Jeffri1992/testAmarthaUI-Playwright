import { test, expect } from '@playwright/test';

// Data barang yang mau dites
const items = [
  "Sauce Labs Backpack",
  "Sauce Labs Fleece Jacket",
];

test.describe('SauceDemo Functional Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
  });

  for (const itemName of items) {
    test(`Add item to cart and verify: ${itemName}`, async ({ page }) => {
      console.log(`Testing item: ${itemName}`);

     
      await page.locator('.inventory_item')
        .filter({ hasText: itemName })
        .getByRole('button', { name: 'Add to cart' })
        .click();

      await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

      await page.click('.shopping_cart_link');
      
      await expect(page.locator('.inventory_item_name')).toContainText(itemName);
    });
  }

  test('Verify About Page Redirection & Content', async ({ page }) => {
    await page.click('#react-burger-menu-btn');
    await page.click('#about_sidebar_link');

  
    await expect(page).toHaveURL(/saucelabs\.com/);
    await expect(page.locator('body')).toContainText('Build apps users love with AI-driven quality');

  
    await expect(page.getByRole('link', { name: 'Sign up for free' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Book a demo' }).first()).toBeVisible();
  });

});