import { test, expect } from '@playwright/test';

test.describe('Проверка конструктора бургера', () => {
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('tests/hars/ingredients.har', {
      url: '**/api/ingredients',
      update: false,
      notFound: 'abort'
    });

    await page.goto('/');
  });

  test('Страница конструктора открывается', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Соберите бургер' })
    ).toBeVisible();

    await expect(
      page.getByText('Краторная булка N-200i')
    ).toBeVisible();

    await expect(
      page.getByText('Биокотлета из марсианской Магнолии')
    ).toBeVisible();
    });

  test('Добавление булки в конструктор', async ({ page }) => {
    const bun = page
      .getByText('Краторная булка N-200i')
      .locator('xpath=../..');

    await bun.getByRole('button', { name: 'Добавить' }).click();

    await expect(
      page.getByText('Краторная булка N-200i (верх)')
    ).toBeVisible();

    await expect(
      page.getByText('Краторная булка N-200i (низ)')
    ).toBeVisible();
});
});
