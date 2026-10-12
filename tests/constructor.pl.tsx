import { expect, test } from '@playwright/test';

test.describe('Проверка работы конструктора', function () {
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('tests/hars/ingredients.har', { url: '**/api/ingredients' });
    await page.goto('/');
  });
  test('Страница показывает ингредиенты из мока', async ({ page }) => {
    await expect(page.getByText('Булка')).toBeVisible();
  });
  test('Булка добавляется в конструктор', async ({ page }) => {
    await page
      .locator('li', { hasText: 'Булка' })
      .getByRole('button', { name: 'Добавить' })
      .click();
    await expect(page.getByTestId('constructor-bun-1')).toContainText('Булка (верх)');
  });
  test('Начинка добавляется в конструктор', async ({ page }) => {
    await page
      .locator('li', { hasText: 'Говяжья котлета' })
      .getByRole('button', { name: 'Добавить' })
      .click();
    await expect(page.getByTestId('constructor-ingredients')).toContainText(
      'Говяжья котлета'
    );
  });
});
