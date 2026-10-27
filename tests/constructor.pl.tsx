import { test, expect } from '@playwright/test';

test.describe('Проверка конструктора бургера', () => {
  test('Страница конструктора открывается', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByRole('heading', { name: 'Соберите бургер' })
    ).toBeVisible();
  });
});
