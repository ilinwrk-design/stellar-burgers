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
});
