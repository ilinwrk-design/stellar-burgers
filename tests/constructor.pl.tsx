import { test, expect } from '@playwright/test';

test.describe('Проверка конструктора бургера', () => {
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('tests/hars/ingredients.har', {
      url: '**/api/ingredients',
      update: false,
      notFound: 'abort',
    });
    await page.routeFromHAR('tests/hars/user.har', {
      url: '**/api/auth/user',
      update: false,
      notFound: 'abort',
    });

    await page.routeFromHAR('tests/hars/order.har', {
      url: '**/api/orders',
      update: false,
      notFound: 'abort',
    });

    await page.goto('/');
  });

  test('Страница конструктора открывается', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Соберите бургер' })).toBeVisible();

    await expect(page.getByText('Краторная булка N-200i')).toBeVisible();

    await expect(page.getByText('Биокотлета из марсианской Магнолии')).toBeVisible();
  });

  test('Добавление булки в конструктор', async ({ page }) => {
    const bunName = 'Краторная булка N-200i';

    await page
      .getByText(bunName)
      .locator('xpath=../..')
      .getByRole('button', { name: 'Добавить' })
      .click();

    const constructor = page.locator('section[class*="burger_constructor"]');

    await expect(constructor.getByText(`${bunName} (верх)`)).toBeVisible();

    await expect(constructor.getByText(`${bunName} (низ)`)).toBeVisible();
  });

  test('Добавление начинки в конструктор', async ({ page }) => {
    const ingredient = page
      .getByText('Биокотлета из марсианской Магнолии')
      .locator('xpath=../..');

    await ingredient.getByRole('button', { name: 'Добавить' }).click();

    await expect(
      page.getByText('Биокотлета из марсианской Магнолии').last()
    ).toBeVisible();
  });

  test('Открытие модального окна ингредиента', async ({ page }) => {
    await page.getByText('Краторная булка N-200i').click();

    await expect(
      page.getByRole('heading', { name: 'Детали ингредиента' })
    ).toBeVisible();

    await expect(page.getByText('Краторная булка N-200i').last()).toBeVisible();
  });

  test('Закрытие модального окна по крестику', async ({ page }) => {
    await page.getByText('Краторная булка N-200i').click();

    const modal = page.getByRole('heading', {
      name: 'Детали ингредиента',
    });

    await expect(modal).toBeVisible();

    await page.getByRole('button', { name: 'Закрыть' }).click();

    await expect(modal).not.toBeVisible();
  });

  test('Закрытие модального окна по оверлею', async ({ page }) => {
    await page.getByText('Краторная булка N-200i').click();

    const modal = page.getByRole('heading', {
      name: 'Детали ингредиента',
    });

    await expect(modal).toBeVisible();

    await page
      .locator('[class*="overlay"]')
      .last()
      .click({
        position: { x: 10, y: 10 },
      });

    await expect(modal).not.toBeVisible();
  });

  test('Создание заказа', async ({ page }) => {
    await page.context().addCookies([
      {
        name: 'accessToken',
        value: 'Bearer test-access-token',
        url: 'http://localhost:4000',
      },
    ]);

    await page.evaluate(() => {
      localStorage.setItem('refreshToken', 'test-refresh-token');
    });

    await page.reload();

    await expect(page.getByRole('heading', { name: 'Соберите бургер' })).toBeVisible();
    const bun = page.getByText('Краторная булка N-200i').locator('xpath=../..');

    await bun.getByRole('button', { name: 'Добавить' }).click();

    const ingredient = page
      .getByText('Биокотлета из марсианской Магнолии')
      .locator('xpath=../..');

    await ingredient.getByRole('button', { name: 'Добавить' }).click();

    await expect(page.getByText('Краторная булка N-200i (верх)')).toBeVisible();

    await expect(page.getByText('Краторная булка N-200i (низ)')).toBeVisible();

    await expect(
      page.getByText('Биокотлета из марсианской Магнолии').last()
    ).toBeVisible();
    await page.getByRole('button', { name: 'Оформить заказ' }).click();

    await expect(page.getByText('12345')).toBeVisible();
    await expect(page.getByText('Выберите булки').first()).toBeVisible();

    await expect(page.getByText('Выберите начинку')).toBeVisible();

    await expect(page.getByText('Выберите булки').last()).toBeVisible();
    await page.getByRole('button', { name: 'Закрыть' }).click();

    await expect(page.getByText('12345')).not.toBeVisible();
  });
});
