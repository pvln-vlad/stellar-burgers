import { expect, test } from '@playwright/test';

test.describe('Проверка работы конструктора', function () {
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('tests/hars/ingredients.har', { url: '**/api/ingredients' });
    await page.goto('/');
  });
  test('[#1] Страница показывает ингредиенты из мока', async ({ page }) => {
    await expect(page.getByText('Булка')).toBeVisible();
  });
  test('[#2] Булка добавляется в конструктор', async ({ page }) => {
    await page
      .locator('li', { hasText: 'Булка' })
      .getByRole('button', { name: 'Добавить' })
      .click();
    await expect(page.getByTestId('constructor-bun-1')).toContainText('Булка (верх)');
  });
  test('[#3] Начинка добавляется в конструктор', async ({ page }) => {
    await page
      .locator('li', { hasText: 'Говяжья котлета' })
      .getByRole('button', { name: 'Добавить' })
      .click();
    await expect(page.getByTestId('constructor-ingredients')).toContainText(
      'Говяжья котлета'
    );
  });
  test('[#4] Модалка открывается с данными выбранного ингредиента', async ({ page }) => {
    await page.getByText('Говяжья котлета').click();
    await expect(page.getByText('Детали ингредиента')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Говяжья котлета' })).toBeVisible();
  });
  test('[#5] Модалка закрывается по крестику', async ({ page }) => {
    await page.getByText('Говяжья котлета').click();
    await expect(page.getByText('Детали ингредиента')).toBeVisible();
    await page.getByRole('button', { name: 'Закрыть' }).click();
    await expect(page.getByText('Детали ингредиента')).not.toBeVisible();
  });
  test('[#6] Модалка закрывается по оверлею', async ({ page }) => {
    await page.getByText('Говяжья котлета').click();
    await expect(page.getByText('Детали ингредиента')).toBeVisible();
    await page.getByTestId('modal-overlay').click({ position: { x: 10, y: 10 } });
    await expect(page.getByText('Детали ингредиента')).not.toBeVisible();
  });
});
