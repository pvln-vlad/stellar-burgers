import { expect, test } from '@playwright/test';

test.describe('add ingredients to constructor works correctly', function () {
  test('страница показывает ингредиенты из мока', async ({ page }) => {
    await page.routeFromHAR('tests/hars/ingredients.har', { url: '**/api/ingredients' });
    await page.goto('/');
    await expect(page.getByText('Булка')).toBeVisible();
  });
});
